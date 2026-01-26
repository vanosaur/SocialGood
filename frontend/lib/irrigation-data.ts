import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export interface MoistureReading {
    timestamp: Date;
    humidity: number;
}

export interface IrrigationData {
    currentMoisture: number;
    moistureHistory: MoistureReading[];
    optimalRange: { min: number; max: number };
    lastIrrigation?: Date;
}

export async function getIrrigationData(fieldId: string): Promise<IrrigationData | null> {
    try {
        // Get last 7 days of moisture readings
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const readings = await prisma.sensorReading.findMany({
            where: {
                fieldId: fieldId,
                timestamp: {
                    gte: sevenDaysAgo
                }
            },
            orderBy: {
                timestamp: 'asc'
            },
            select: {
                timestamp: true,
                humidity: true
            }
        });

        if (readings.length === 0) {
            return null;
        }

        // Get current (latest) reading
        const latestReading = readings[readings.length - 1];

        return {
            currentMoisture: latestReading.humidity,
            moistureHistory: readings.map(r => ({
                timestamp: r.timestamp,
                humidity: r.humidity
            })),
            optimalRange: { min: 60, max: 80 }, // Can be crop-specific later
        };
    } catch (error) {
        console.error("Error fetching irrigation data:", error);
        return null;
    }
}
