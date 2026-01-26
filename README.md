# Crop Recommendation System

A full-stack AI application for precision agriculture.

## Architecture
- **Frontend**: Next.js (App Router), Tailwind CSS.
- **Backend**: Next.js API Routes (Serverless functions).
- **Database**: MongoDB (via Prisma ORM).
- **ML Service**: Python FastAPI + Scikit-learn (Random Forest Model).

## Setup & Run

### 1. Database
Ensure MongoDB is running locally on port 27017.
```bash
# If using Docker
docker run -d -p 27017:27017 mongo
```

### 2. Machine Learning Service (Python)
Navigate to `backend/`:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn scikit-learn pandas joblib
python3 train_model.py  # Train model
uvicorn main:app --reload --port 8000
```

### 3. Web Application (Next.js)
Navigate to `frontend/`:
```bash
cd frontend
npm install
# Sync DB Schema
npx prisma db push
# Start App
npm run dev
```

Visit `http://localhost:3000` to access the application.
