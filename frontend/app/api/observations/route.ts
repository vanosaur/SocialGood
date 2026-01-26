import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all observations for a field
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const fieldId = searchParams.get('fieldId');

        if (!fieldId) {
            return NextResponse.json({ error: 'Field ID required' }, { status: 400 });
        }

        const observations = await prisma.observation.findMany({
            where: { fieldId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ observations });
    } catch (error) {
        console.error('Error fetching observations:', error);
        return NextResponse.json({ error: 'Failed to fetch observations' }, { status: 500 });
    }
}

// POST - Create new observation
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fieldId, growthStage, healthRating, notes, photoUrl } = body;

        if (!fieldId || !growthStage || healthRating === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const observation = await prisma.observation.create({
            data: {
                fieldId,
                growthStage,
                healthRating: parseInt(healthRating),
                notes: notes || null,
                photoUrl: photoUrl || null,
            },
        });

        return NextResponse.json({ observation }, { status: 201 });
    } catch (error) {
        console.error('Error creating observation:', error);
        return NextResponse.json({ error: 'Failed to create observation' }, { status: 500 });
    }
}

// DELETE - Delete observation
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Observation ID required' }, { status: 400 });
        }

        await prisma.observation.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting observation:', error);
        return NextResponse.json({ error: 'Failed to delete observation' }, { status: 500 });
    }
}
