import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY || "";
    console.log("API Key (first 10 chars):", apiKey.substring(0, 10) + "...");

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // @ts-ignore
        const models = await (genAI as any).listModels();
        console.log("\n✅ Available Models:");
        for await (const model of models) {
            console.log(`  - ${model.name}`);
            console.log(`    Supported: ${model.supportedGenerationMethods?.join(', ')}`);
        }
    } catch (error) {
        console.error("❌ Error listing models:", error);
    }
}

listModels();
