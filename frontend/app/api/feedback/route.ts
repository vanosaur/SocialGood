import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { recommendationId, chosenCrop, success, notes } = body;

        if (!recommendationId || !chosenCrop || success === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: {
                recommendationId,
                chosenCrop,
                success,
                notes,
            },
        });

        return NextResponse.json(feedback);

    } catch (error) {
        console.error("Feedback API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
