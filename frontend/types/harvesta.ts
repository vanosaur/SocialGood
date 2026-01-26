export interface User {
    name: string;
    role: string;
    avatarUrl?: string;
}

export interface Field {
    id: string;
    name: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    location?: string | { coordinates: number[] };
    plantedAreaHa?: number;
    soilWateringIntervalHours?: number;
    ndvi?: number;
    humidity?: number;
    humidityOptimal?: boolean;
    humidityOptimalCrop?: string;
    size?: number; // Alternative to plantedAreaHa
}

export interface Crop {
    id: string;
    label: string; // e.g. "Corn", "Rice"
    name: string;  // e.g. "Maize", "Oryza sativa"
    yieldLevel: 'High' | 'Medium' | 'Low';
    imageUrl?: string;
}

export interface NpkLevels {
    nitrogen: { current: number; max: number };
    phosphorus: { current: number; max: number };
    potassium: { current: number; max: number };
    weekLabel: string; // e.g. "This week"
}

export interface LeafAreaIndexPoint {
    weekLabel: string; // e.g. "WEEK 01"
    value: number;
    isCurrentWeek: boolean;
}

export interface FieldDashboardData {
    user: User;
    field: Field;
    crops: Crop[];
    npk: NpkLevels;
    leafAreaIndex: LeafAreaIndexPoint[];
}
