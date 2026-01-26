// OpenWeather API integration
// Free tier: 1000 calls/day, 60 calls/minute

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
    current: {
        temp: number;
        feels_like: number;
        humidity: number;
        wind_speed: number;
        weather: { main: string; description: string; icon: string }[];
    };
    daily: Array<{
        dt: number;
        temp: { day: number };
        humidity: number;
        pop: number; // Probability of precipitation
        weather: { main: string; description: string; icon: string }[];
    }>;
}

export async function getWeatherForecast(lat: number, lon: number): Promise<WeatherData | null> {
    if (!OPENWEATHER_API_KEY) {
        console.warn("OpenWeather API key not set. Using mock data.");
        return null;
    }

    try {
        const response = await fetch(
            `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${OPENWEATHER_API_KEY}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}

// Helper to get weather icon
export function getWeatherIcon(condition: string) {
    const iconMap: Record<string, string> = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
    };
    return iconMap[condition] || '🌤️';
}
