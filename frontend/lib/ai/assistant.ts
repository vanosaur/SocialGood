export interface IrrigationPlanInput {
    fieldId: string;
    currentMoisture: number;
}

export interface IrrigationPlan {
    recommendedWatering: string;
    reasoning: string;
}

export interface NpkAnalysisInput {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
}

export interface NpkAnalysis {
    status: 'Optimal' | 'Deficient' | 'Excessive';
    recommendation: string;
}

export interface HarvestaAssistant {
    generateIrrigationPlan(input: IrrigationPlanInput): Promise<IrrigationPlan>;
    analyzeNpkLevels(input: NpkAnalysisInput): Promise<NpkAnalysis>;
    answerQuestion(input: { fieldId: string; question: string }): Promise<string>;
}

export class MockHarvestaAssistant implements HarvestaAssistant {
    async generateIrrigationPlan(input: IrrigationPlanInput): Promise<IrrigationPlan> {
        return {
            recommendedWatering: "2 hours tomorrow morning",
            reasoning: "Soil moisture is slightly low (19%) and temperature is rising."
        };
    }

    async analyzeNpkLevels(input: NpkAnalysisInput): Promise<NpkAnalysis> {
        return {
            status: 'Optimal',
            recommendation: "Current NPK levels are balanced for Rice cultivation."
        };
    }

    async answerQuestion(input: { fieldId: string; question: string }): Promise<string> {
        // Simple mock logic
        if (input.question.toLowerCase().includes('planting')) {
            return "Based on the current humidity (82%) and NDVI (0.62), it is an excellent time for planting leafy greens or maintaining current Rice crops.";
        }
        return "I am analyzing the field data... all metrics appear stable. How else can I assist you?";
    }
}