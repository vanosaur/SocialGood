// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 1. Create a User
  // We use 'upsert' so it doesn't crash if you run this twice
  const user = await prisma.user.create({
    data: {
      email: "demo@harvesta.com",
      name: "Alex Agronomist",
    }
  });

  console.log(`Created User: ${user.id}`);

  // 2. Create a Field for that User
  const field = await prisma.field.create({
    data: {
      userId: user.id,
      name: "Sector Alpha",
      location: "Iowa, USA",
      area: 45.2,
      coordinates: "[-93.2, 42.0]", // Simplified for now
      
      // Add Crops
      crops: {
        create: [
          { name: "Corn", status: "Healthy", yield: 92.5 },
          { name: "Soybean", status: "Monitor", yield: 78.0 }
        ]
      },
      
      // Add Sensor Readings
      readings: {
        create: [
          {
            nitrogen: 140,
            phosphorus: 45,
            potassium: 50,
            temperature: 24.5,
            humidity: 62,
            leafArea: 4.1
          }
        ]
      }
    }
  });

  console.log(`Created Field: ${field.id}`);
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });