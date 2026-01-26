import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all fertilizer applications for a field
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const fieldId = searchParams.get('fieldId');

        if (!fieldId) {
            return NextResponse.json({ error: 'Field ID required' }, { status: 400 });
        }

        const applications = await prisma.fertilizerApplication.findMany({
            where: { fieldId },
            orderBy: { appliedAt: 'desc' },
        });

        return NextResponse.json({ applications });
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}

// POST - Create new fertilizer application
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fieldId, type, amount, nitrogen, phosphorus, potassium, notes } = body;

        if (!fieldId || !type || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const application = await prisma.fertilizerApplication.create({
            data: {
                fieldId,
                type,
                amount: parseFloat(amount),
                nitrogen: nitrogen ? parseFloat(nitrogen) : null,
                phosphorus: phosphorus ? parseFloat(phosphorus) : null,
                potassium: potassium ? parseFloat(potassium) : null,
                notes: notes || null,
            },
        });

        return NextResponse.json({ application }, { status: 201 });
    } catch (error) {
        console.error('Error creating application:', error);
        return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
    }
}

// DELETE - Delete fertilizer application
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Application ID required' }, { status: 400 });
        }

        await prisma.fertilizerApplication.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting application:', error);
        return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
    }
}
