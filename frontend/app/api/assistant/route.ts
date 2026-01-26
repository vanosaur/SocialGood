import { NextResponse } from 'next/server';
import { GeminiAssistant } from '@/lib/ai/gemini-assistant';

// Switch this validation to use a real implementation later
const assistant = new GeminiAssistant();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, input } = body;

        let result;

        switch (action) {
            case 'answerQuestion':
                result = await assistant.answerQuestion(input);
                break;
            case 'generateIrrigationPlan':
                result = await assistant.generateIrrigationPlan(input);
                break;
            case 'analyzeNpkLevels':
                result = await assistant.analyzeNpkLevels(input);
                break;
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ result });
    } catch (error) {
        console.error('AI Assistant Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
