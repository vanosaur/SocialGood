import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

// Instantiate Prisma Client (best practice: use global singleton in non-serverless envs to prevent connection exhaustion, but fine for now)
const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { N, P, K, temperature, humidity, ph, rainfall, location, userId } = body;

        // 1. Validate inputs (basic check)
        if (N == null || P == null || K == null || temperature == null || humidity == null || ph == null || rainfall == null) {
            return NextResponse.json({ error: "Missing required soil parameters" }, { status: 400 });
        }

        // 2. Call ML Service
        const mlServiceUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";
        let mlResponse;
        try {
            mlResponse = await axios.post(`${mlServiceUrl}/api/predict`, {
                N: Number(N),
                P: Number(P),
                K: Number(K),
                temperature: Number(temperature),
                humidity: Number(humidity),
                ph: Number(ph),
                rainfall: Number(rainfall),
            });
        } catch (error) {
            console.error("ML Service Error:", error);
            return NextResponse.json({ error: "Failed to get prediction from ML service" }, { status: 500 });
        }

        const { recommended_crop, top_predictions, explanation } = mlResponse.data;

        // 3. Save to Database
        let recommendation;
        try {
            recommendation = await prisma.recommendation.create({
                data: {
                    N: Number(N),
                    P: Number(P),
                    K: Number(K),
                    temperature: Number(temperature),
                    humidity: Number(humidity),
                    ph: Number(ph),
                    rainfall: Number(rainfall),
                    location: location || "Unknown",
                    userId: userId || undefined, // Optional relation
                    result: {
                        recommended_crop,
                        top_predictions
                    },
                    explanation
                },
            });
        } catch (dbError) {
            console.error("Database Save Error", dbError);
            // We might still want to return the result even if DB save fails
            // But for this app, let's treat it as critical or just log it
        }


        // 4. Return Response
        return NextResponse.json({
            id: recommendation?.id, // Return ID for feedback
            recommended_crop,
            top_predictions,
            explanation
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
