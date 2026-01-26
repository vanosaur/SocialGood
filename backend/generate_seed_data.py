import pandas as pd
import json

# Load dataset
try:
    df = pd.read_csv('Crop_recommendation.csv')
except:
    # Fallback if file not found in current dir, try parent or absolute path if needed
    # But we are in backend/ so it should be there.
    df = pd.read_csv('../backend/Crop_recommendation.csv')

crops = []
for crop_name in df['label'].unique():
    subset = df[df['label'] == crop_name]
    
    crop_info = {
        "name": crop_name,
        "description": f"The {crop_name} is a crop that requires specific soil and climate conditions.",
        "minN": float(subset['N'].min()),
        "maxN": float(subset['N'].max()),
        "minP": float(subset['P'].min()),
        "maxP": float(subset['P'].max()),
        "minK": float(subset['K'].min()),
        "maxK": float(subset['K'].max()),
        "minPh": float(subset['ph'].min()),
        "maxPh": float(subset['ph'].max()),
        "minTemp": float(subset['temperature'].min()),
        "maxTemp": float(subset['temperature'].max()),
        "minHumid": float(subset['humidity'].min()),
        "maxHumid": float(subset['humidity'].max()),
        "minRain": float(subset['rainfall'].min()),
        "maxRain": float(subset['rainfall'].max())
    }
    crops.append(crop_info)

# Output as TS file
ts_content = f"export const crops = {json.dumps(crops, indent=2)};"

with open('../frontend/prisma/seed_data.ts', 'w') as f:
    f.write(ts_content)

print("Generated ../frontend/prisma/seed_data.ts")
