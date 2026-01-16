from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os
from groq import Groq
from dotenv import load_dotenv
api_key = os.getenv("GROQ_API_KEY")

# 1. Initialize the App
app = FastAPI()

# 2. CORS (The Bridge): Allows your Frontend (Next.js) to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load the "Brains" (ML Model & AI Client)
# Ensure 'crop_recommendation_model.pkl' is in the same folder as main.py
try:
    model = pickle.load(open('crop_recommendation_model.pkl', 'rb'))
except FileNotFoundError:
    print("⚠️ ALERT: Model file not found. Please upload 'crop_recommendation_model.pkl' to the backend folder.")
    model = None



# 4. Define the Input Data Structure (Data Validation)
class SoilData(BaseModel):
    N: int          
    P: int
    K: int
    temperature: float
    humidity: float
    ph: float      
    rainfall: float

# 5. The API Endpoint
@app.post("/recommend")
async def recommend_crop(data: SoilData):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")

    # --- A. Predict the Crop (Machine Learning) ---
    # Convert input to the format the model expects: [[N, P, K, Temp, Humidity, pH, Rain]]
    features = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])
    prediction = model.predict(features)
    predicted_crop = prediction[0]

    # --- B. Get the Strategy (Generative AI) ---
    # We ask Llama-3 to generate the specific sections you asked for.
    prompt = f"""
    You are an expert agronomist. The predicted crop is '{predicted_crop}' for a farm with these conditions:
print(f"Nitrogen: {data.N}, Phosphorus: {data.P}, Potassium: {data.K}, pH: {data.ph}, Rainfall: {data.rainfall}mm")

    Generate a strict HTML roadmap with these exact 3 sections:
    1. <h3>💰 Market Potential</h3>: Estimated profitability per acre in India (INR) and current demand trends.
    2. <h3>📅 3-Month Plan</h3>: A detailed checklist for Month 1 (Sowing), Month 2 (Care), and Month 3 (Harvest).
    3. <h3>⚠️ Risk Management</h3>: One major disease to watch out for and a specific organic remedy.

    Keep it professional, concise, and use minimal HTML tags for formatting (like <b> for bold). Do not include markdown code blocks.
    """

    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.1-8b-instant"
    )
    
    ai_roadmap = chat_completion.choices[0].message.content
    
    # ADD THIS PRINT STATEMENT TO DEBUG
    print("---------------- AI RESPONSE ----------------")
    print(ai_roadmap)
    print("---------------------------------------------")

    return {
        "crop": predicted_crop,
        "roadmap": ai_roadmap,
        "input_data": data
    }

# 6. Run Instruction
# Run this in terminal: uvicorn main:app --reload