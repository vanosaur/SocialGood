import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all schedules for a field
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const fieldId = searchParams.get('fieldId');

        if (!fieldId) {
            return NextResponse.json({ error: 'Field ID required' }, { status: 400 });
        }

        const schedules = await prisma.irrigationSchedule.findMany({
            where: { fieldId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ schedules });
    } catch (error) {
        console.error('Error fetching schedules:', error);
        return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
    }
}

// POST - Create new schedule
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fieldId, time, duration, frequency } = body;

        if (!fieldId || !time || !duration || !frequency) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const schedule = await prisma.irrigationSchedule.create({
            data: {
                fieldId,
                time,
                duration: parseInt(duration),
                frequency,
                active: true,
            },
        });

        return NextResponse.json({ schedule }, { status: 201 });
    } catch (error) {
        console.error('Error creating schedule:', error);
        return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 });
    }
}

// PATCH - Update schedule (toggle active or edit)
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, active, time, duration, frequency } = body;

        if (!id) {
            return NextResponse.json({ error: 'Schedule ID required' }, { status: 400 });
        }

        const updateData: any = {};
        if (active !== undefined) updateData.active = active;
        if (time) updateData.time = time;
        if (duration) updateData.duration = parseInt(duration);
        if (frequency) updateData.frequency = frequency;

        const schedule = await prisma.irrigationSchedule.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ schedule });
    } catch (error) {
        console.error('Error updating schedule:', error);
        return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }
}

// DELETE - Delete schedule
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Schedule ID required' }, { status: 400 });
        }

        await prisma.irrigationSchedule.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        return NextResponse.json({ error: 'Failed to delete schedule' }, { status: 500 });
    }
}
