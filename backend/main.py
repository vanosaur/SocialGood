import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from dotenv import load_dotenv
from google import genai  # <--- NEW AI LIBRARY

# Load environment variables (API Key)
load_dotenv()

app = FastAPI()

# --- CORS SETUP ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- LOAD ML MODEL ---
MODEL_PATH = "crop_recommendation_model.pkl"
LABEL_ENCODER_PATH = "label_encoder.pkl"

if os.path.exists(MODEL_PATH) and os.path.exists(LABEL_ENCODER_PATH):
    model = joblib.load(MODEL_PATH)
    le = joblib.load(LABEL_ENCODER_PATH)
    print("✅ ML Model loaded successfully.")
else:
    model = None
    le = None
    print("⚠️ Warning: Model not found. Please run train_model.py")

# --- DATA MODELS ---
class SoilData(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# New Model for AI Chat
class ChatData(BaseModel):
    message: str
    fieldName: str
    stats: dict  # This will contain N, P, K, etc.

# --- ROOT ENDPOINT ---
@app.get("/")
def read_root():
    return {"message": "Harvesta Backend is Running! (ML + Gemini AI)"}

# --- ML ENDPOINT: CROP STATISTICS ---
@app.get("/api/crop-stats")
def get_crop_stats():
    csv_path = "Crop_recommendation.csv"
    if not os.path.exists(csv_path):
         raise HTTPException(status_code=500, detail="Crop data CSV not found")
    
    try:
        df = pd.read_csv(csv_path)
        numerical_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        summary = df.groupby('label')[numerical_cols].mean().reset_index()
        summary[numerical_cols] = summary[numerical_cols].round(1)
        return summary.to_dict(orient='records')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing data: {str(e)}")

# --- ML ENDPOINT: PREDICT CROP ---
@app.post("/api/predict")
def predict_crop(data: SoilData):
    if not model or not le:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    features = np.array([[
        data.N, data.P, data.K, 
        data.temperature, data.humidity, 
        data.ph, data.rainfall
    ]])
    
    try:
        prediction_idx = model.predict(features)[0]
        prediction_label = le.inverse_transform([prediction_idx])[0]
        probs = model.predict_proba(features)[0]
        
        top_indices = probs.argsort()[-3:][::-1]
        top_crops = []
        
        for idx in top_indices:
            crop_name = le.inverse_transform([idx])[0]
            probability = float(probs[idx])
            top_crops.append({"crop": crop_name, "probability": probability})

        explanation = f"Conditions (N: {data.N}, P: {data.P}, Rainfall: {data.rainfall}) best match {prediction_label}."

        return {
            "recommended_crop": prediction_label,
            "top_predictions": top_crops,
            "explanation": explanation
        }
    except Exception as e:
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# --- NEW AI ENDPOINT: GEMINI CHAT ---
@app.post("/api/chat")
async def chat_with_ai(data: ChatData):
    """
    This endpoint handles the 'Ask AI' feature using Google Gemini.
    """
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return {"reply": "Error: API Key missing in backend."}

        # Initialize the NEW Google GenAI Client
        client = genai.Client(api_key=api_key)

        # Construct the context prompt
        system_prompt = f"""
        You are Harvesta AI, an expert agricultural assistant.
        CONTEXT:
        - Field Name: {data.fieldName}
        - Soil Stats: {data.stats}
        
        USER QUESTION: "{data.message}"
        
        INSTRUCTION:
        Answer the farmer's question briefly and helpfully based on the soil stats provided.
        """

        # Call the Gemini 2.0 Flash Model
        response = client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=system_prompt
        )
        
        return {"reply": response.text}

    except Exception as e:
        print(f"AI Error: {e}")
        # Return a safe fallback so the app doesn't crash
        return {"reply": "I am having trouble connecting to the satellite network. Please try again in a moment."}
    
    # --- RESTORED ENDPOINT: RECOMMEND ---
# This matches what your Frontend is asking for!
@app.post("/recommend")
def recommend_crops(data: SoilData):
    """Endpoint that returns top 3 crop recommendations"""
    if not model or not le:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    # Prepare features matching the training order
    features = np.array([[
        data.N, data.P, data.K, 
        data.temperature, data.humidity, 
        data.ph, data.rainfall
    ]])
    
    try:
        # Get probabilities for all crops
        probs = model.predict_proba(features)[0]
        # Get top 3 indices
        top_indices = probs.argsort()[-3:][::-1]
        
        recommendations = []
        for idx in top_indices:
            crop_name = le.inverse_transform([idx])[0]
            probability = float(probs[idx])
            recommendations.append({"crop": crop_name, "probability": probability})
        
        return {"recommendations": recommendations}
    except Exception as e:
        print(f"Recommendation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))