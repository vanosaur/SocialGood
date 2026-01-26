import { PrismaClient } from '@prisma/client';

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
  crops: {
    name: string;
    health: number; // Mapped from yield/status for now
    status: string;
  }[];
  stats: {
    soilMoisture: number; // Mapped from humidity or similar
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
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

    if (!fieldData) {
      console.warn(`Field with ID ${fieldId} not found.`);
      return null;
    }

    // 2. Extract latest sensor reading (handle case where no readings exist)
    const latest = fieldData.readings[0] || {
      nitrogen: 0, phosphorus: 0, potassium: 0,
      humidity: 0, leafArea: 0, temperature: 0
    };

    // Parse coordinates safely
    let coords = [0, 0];
    try {
      if (fieldData.coordinates) {
        coords = JSON.parse(fieldData.coordinates);
      }
    } catch (e) {
      console.warn("Failed to parse coordinates", fieldData.coordinates);
    }

    // 3. Transform DB Data -> Dashboard UI Data
    return {
      user: {
        name: fieldData.user.name || "Farmer",
        role: "Owner",
        avatar: "/default-avatar.jpg",
      },
      field: {
        id: fieldData.id,
        name: fieldData.name,
        location: { coordinates: coords },
        size: fieldData.area,
      },
      crops: fieldData.crops.map(crop => ({
        name: crop.name,
        health: crop.yield, // Using yield as a proxy for health score in this UI
        status: crop.status
      })),
      stats: {
        soilMoisture: latest.humidity, // Using humidity as soil moisture proxy
        nitrogen: latest.nitrogen,
        phosphorus: latest.phosphorus,
        potassium: latest.potassium,
      }
    };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
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