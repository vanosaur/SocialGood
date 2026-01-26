
import { PrismaClient } from '@prisma/client';
import { GeminiAssistant } from './lib/ai/gemini-assistant'; // Adjust path if needed
import dotenv from 'dotenv';

dotenv.config();

async function verify() {
    console.log("--- Starting Verification ---");

    // 1. Check MongoDB
    console.log("\n1. Testing MongoDB Connection...");
    const prisma = new PrismaClient();
    try {
        const userCount = await prisma.user.count();
        console.log(`✅ MongoDB Connected! Found ${userCount} users.`);

        const firstField = await prisma.field.findFirst();
        if (firstField) {
            console.log(`   Found field: ${firstField.name} (ID: ${firstField.id})`);
        } else {
            console.log("   No fields found (Seed might be needed).");
        }
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    } finally {
        await prisma.$disconnect();
    }

    // 2. Check AI Assistant
    console.log("\n2. Testing Gemini AI Assistant...");
    const assistant = new GeminiAssistant();
    try {
        const response = await assistant.answerQuestion({
            fieldId: "test-field",
            question: "What is the best NPK ratio for corn?",
            context: { note: "This is a test context" }
        });

        if (response && response.length > 10) {
            console.log("✅ AI Assistant Responded!");
            console.log("   Preview:", response.substring(0, 50) + "...");
        } else {
            console.log("⚠️ AI Response was empty or invalid.");
            console.log("   Response:", response);
        }
    } catch (error) {
        console.error("❌ AI Assistant Failed:", error);
    }

    console.log("\n--- Verification Complete ---");
}

verify();
