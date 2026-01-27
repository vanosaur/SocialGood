import { PrismaClient } from '@prisma/client';
import { Crop } from '@/types/harvesta';

// Prevent multiple Prisma instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Define the shape of the data your Dashboard expects
// (Matching components/DashboardClient.tsx)
export interface DashboardData {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  field: {
    id: string; // Keep ID for potential future use
    name: string;
    location: { coordinates: number[] }; // GeoJSON-like [lng, lat]
    size: number; // Raw number (acres/hectares)
  };
  crops: Crop[];
  stats: {
    soilMoisture: number; // Mapped from humidity or similar
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  npk: {
    nitrogen: { current: number; max: number };
    phosphorus: { current: number; max: number };
    potassium: { current: number; max: number };
    weekLabel: string;
  };
  leafAreaIndex: {
    weekLabel: string;
    value: number;
    isCurrentWeek: boolean;
  }[];
}

// Fetch dashboard data based on Field ID
export async function getFieldDashboardData(fieldId: string): Promise<DashboardData | null> {
  try {
    // 1. Fetch Field with all relations
    const fieldData = await prisma.field.findUnique({
      where: { id: fieldId },
      include: {
        user: true,
        crops: true,
        readings: {
          orderBy: { timestamp: 'desc' }, // Get the newest reading
          take: 1
        }
      }
    });

    if (!fieldData) return null;

    // 2. Transform the data
    const latestReading = fieldData.readings[0] || {};

    return {
      user: {
        name: fieldData.user?.name || 'Farmer',
        role: 'Owner', // Default role
        avatar: '/user-avatar.jpg', // Placeholder
      },
      field: {
        id: fieldData.id,
        name: fieldData.name,
        location: fieldData.coordinates ? JSON.parse(fieldData.coordinates) : { coordinates: [0, 0] },
        size: fieldData.area,
      },
      crops: fieldData.crops.map(c => ({
        id: c.id,
        label: c.name,
        name: c.name,
        yieldLevel: c.yield > 80 ? 'High' : c.yield > 50 ? 'Medium' : 'Low',
      })),
      stats: {
        soilMoisture: latestReading.humidity || 0,
        nitrogen: latestReading.nitrogen || 0,
        phosphorus: latestReading.phosphorus || 0,
        potassium: latestReading.potassium || 0,
      },
      // Mock/Calculated NPK for the trend card
      npk: {
        nitrogen: { current: latestReading.nitrogen || 65, max: 130 },
        phosphorus: { current: latestReading.phosphorus || 45, max: 70 },
        potassium: { current: latestReading.potassium || 50, max: 80 },
        weekLabel: 'This Week',
      },
      // Mock Leaf Area Index data
      leafAreaIndex: [
        { weekLabel: 'WEEK 01', value: 2.1, isCurrentWeek: false },
        { weekLabel: 'WEEK 02', value: 2.3, isCurrentWeek: false },
        { weekLabel: 'WEEK 03', value: 2.8, isCurrentWeek: false },
        { weekLabel: 'WEEK 04', value: 3.2, isCurrentWeek: false },
        { weekLabel: 'WEEK 05', value: 3.5, isCurrentWeek: false },
        { weekLabel: 'WEEK 06', value: 3.8, isCurrentWeek: false },
        { weekLabel: 'WEEK 07', value: 4.1, isCurrentWeek: true },
      ]
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
}

// Helper: Get Current User (Used by Layout)
// In a real app with Auth, you'd fetch this using session/cookies.
// Here we just fetch the first user from the DB for demo purposes.
export async function getCurrentUser() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      // Fallback if DB is empty
      return { name: "Guest", role: "Visitor", avatarUrl: "/default-avatar.jpg" };
    }
    return {
      name: user.name || "Farmer",
      role: "Owner", // Static role for now
      avatarUrl: "/default-avatar.jpg" // Fallback avatar
    };
  } catch (error) {
    console.error("Error fetching user for layout:", error);
    return { name: "Error User", role: "Unknown", avatarUrl: "" };
  }
}