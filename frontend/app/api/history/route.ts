import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Prevent instantiation of extra clients
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(req: Request) {
    try {
        // In a real app, we'd filter by authenticated user.
        // retrieving recent history for now.
        const history = await prisma.recommendation.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
            include: {
                feedback: true
            }
        });

        return NextResponse.json(history);

    } catch (error) {
        console.error("History API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
