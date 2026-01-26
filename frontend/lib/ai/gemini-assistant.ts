import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarvestaAssistant, IrrigationPlanInput, IrrigationPlan, NpkAnalysisInput, NpkAnalysis } from "./assistant";

// Initialize Gemini (only if key exists)
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export class GeminiAssistant implements HarvestaAssistant {

    async answerQuestion(input: { fieldId: string; question: string; context?: any }): Promise<string> {
        if (!apiKey) return "Error: GEMINI_API_KEY is not set in environment variables.";

        try {
            const prompt = `
            You are Harvesta AI, an expert agricultural consultant.
            
            Context Data:
            ${JSON.stringify(input.context || {}, null, 2)}
            
            User Question: "${input.question}"
            
            Provide a helpful, concise answer based on the context data provided. Focus on actionable advice for the farmer.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini Error:", error);
            return "I'm having trouble connecting to the satellite network. Please try again later.";
        }
    }

    async generateIrrigationPlan(input: IrrigationPlanInput): Promise<IrrigationPlan> {
        // Implement similarly if needed, or keep mock logic for specific tool calls
        return {
            recommendedWatering: "AI Irrigation Planning not yet implemented on this tier.",
            reasoning: "Please use the general chat for advice."
        };
    }

    async analyzeNpkLevels(input: NpkAnalysisInput): Promise<NpkAnalysis> {
        // Implement similarly
        return {
            status: "Optimal",
            recommendation: "AI Analysis pending."
        };
    }
}
