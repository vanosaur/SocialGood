'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sprout, Droplets, CloudRain,
    Search, ArrowUpRight, Send, ChevronRight, MapPin
} from 'lucide-react';

import { Crop } from '@/types/harvesta';

// Dynamically import Map (client-side only)
const MapBackground = dynamic(
    () => import('./MapBackground'),
    { ssr: false }
);

// --- 1. DEFINE TYPES THAT MATCH YOUR MONGODB DATA ---
interface DashboardProps {
    user: {
        name: string;
        // Make email optional (?) and add the properties TypeScript found
        email?: string;
        role?: string;
        avatar?: string;
    };
    field: {
        name: string;
        size: number;
        location: { coordinates: number[] };
    };
    stats: {
        soilMoisture: number;
        nitrogen: number;
        phosphorus: number;
        potassium: number;
    };
    crops: Crop[];
}
// --- MAIN COMPONENT ---
export default function DashboardClient({ user, field, stats, crops }: DashboardProps) {
    const [query, setQuery] = useState('');
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // AI Chat Handler
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setChatOpen(true);
        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setQuery('');
        setIsTyping(true);

        // Call AI Backend
        try {
            const res = await fetch('/api/assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'answerQuestion',
                    input: {
                        fieldId: field.name, // Using name as ID for now or pass ID prop
                        question: query,
                        // Pass context to help the AI (even if mock for now)
                        context: { stats, crops }
                    }
                })
            });

            const data = await res.json();

            const aiResponse = {
                role: 'assistant',
                content: data.result || "I'm having trouble connecting to the satellite. Please try again.",
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Connection error." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="relative flex flex-col h-full w-full font-sans min-h-screen">

            {/* HEADER */}
            <header className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto bg-[#f4f1ea]/90 backdrop-blur-md p-2 pl-4 pr-6 rounded-full shadow-sm flex items-center gap-4 border border-[#e8e4db]">
                    <button className="p-2 hover:bg-[#dce2d3] rounded-full transition-colors"><ChevronRight className="rotate-180" /></button>
                    <div>
                        {/* REAL DATA: Field Name */}
                        <h1 className="text-xl font-bold">{field.name}</h1>
                    </div>
                    <div className="text-xs text-slate-500 font-mono border-l border-slate-300 pl-4">
                        {/* REAL DATA: Location (Fixed "undefined" crash) */}
                        {field.location?.coordinates?.[1]?.toFixed(4) || '0.00'}°N<br />
                        {field.location?.coordinates?.[0]?.toFixed(4) || '0.00'}°W
                    </div>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <div className="bg-[#f4f1ea] px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm border border-[#e8e4db]">
                        <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Farmer</p>
                            {/* REAL DATA: User Name */}
                            <p className="font-bold text-sm">{user.name}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAP BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <MapBackground />
            </div>

            {/* DASHBOARD WIDGETS */}
            <div className="relative z-10 flex-1 p-8 pointer-events-none flex flex-col justify-center">

                {/* Upper Widgets Row */}
                <div className="flex gap-6 mb-6 mt-20 pointer-events-auto">
                    {/* REAL DATA: Size & Soil Moisture */}
                    <StatPill label="Planted area" value={`${field.size || 0} ac`} icon={<Sprout size={18} />} />
                    <StatPill label="Soil Moisture" value={`${stats.soilMoisture || 0}%`} icon={<Droplets size={18} />} />
                    <StatPill label="Humidity" value="62%" icon={<CloudRain size={18} />} />
                </div>

                {/* Crop Cards */}
                <div className="flex gap-6 mb-auto pointer-events-auto">
                    <div className="bg-[#f4f1ea] p-5 rounded-3xl shadow-xl border border-white/50 w-[500px] flex gap-4">
                        <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                            <span className="bg-[#c5e065] self-start px-2 py-1 rounded-lg text-xs font-bold text-[#2d412d]">Live Health</span>
                            <div className="relative z-10">
                                {/* REAL DATA: Yield Level of first crop */}
                                <span className="text-4xl font-bold block mb-1">{crops[0]?.yieldLevel || 'N/A'}</span>
                                <span className="text-xs text-slate-500 uppercase tracking-wide">Yield Forecast</span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            {/* REAL DATA: Map Crops */}
                            {crops.map((crop, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-2 pr-4 rounded-xl shadow-sm">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold">
                                        {crop.label[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold capitalize">{crop.label}</p>
                                        <p className="text-[10px] text-slate-500 text-right">{crop.yieldLevel}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: NPK Levels */}
                <div className="grid grid-cols-3 gap-6 pointer-events-auto items-end">
                    <div className="bg-[#f4f1ea] p-6 rounded-3xl shadow-xl border border-white/50">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold">NPK Levels</h3>
                                <p className="text-xs text-slate-500">Live Sensors</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {/* REAL DATA: Stats (Mapped correctly) */}
                            <NPKBar label="Nitrogen" value={stats.nitrogen || 0} max={200} />
                            <NPKBar label="Phosphorus" value={stats.phosphorus || 0} max={200} />
                            <NPKBar label="Potassium" value={stats.potassium || 0} max={300} />
                        </div>
                    </div>

                    {/* Chat Interface */}
                    <div className="bg-[#f4f1ea] p-1 rounded-[2rem] shadow-xl border border-white/50">
                        <AnimatePresence>
                            {chatOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="bg-white rounded-[1.8rem] mb-2 p-4 max-h-[200px] overflow-y-auto"
                                >
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`mb-3 ${msg.role === 'assistant' ? 'bg-[#f4f1ea]' : 'bg-[#dce2d3] ml-auto'} p-3 rounded-2xl max-w-[90%] text-sm`}>
                                            <p>{msg.content}</p>
                                        </div>
                                    ))}
                                    {isTyping && <div className="text-xs text-slate-400 pl-2">Harvesta AI is analyzing...</div>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="bg-[#e8e4db] rounded-[1.8rem] p-2 flex items-center gap-2">
                            <form onSubmit={handleSearch} className="flex-1 ml-4">
                                <input
                                    type="text"
                                    placeholder="Ask Harvesta AI..."
                                    className="w-full bg-transparent outline-none text-[#2d412d] placeholder-slate-500 font-medium"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </form>
                            <button onClick={handleSearch} className="p-3 bg-[#c5e065] rounded-full">
                                <Send size={18} className="text-[#2d412d]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS ---
function StatPill({ label, value, icon }: any) {
    return (
        <div className="bg-[#f4f1ea] px-5 py-3 rounded-2xl flex items-center gap-4 shadow-lg border border-white/50 min-w-[180px]">
            <div className="bg-[#dad7cd] p-2 rounded-full text-[#3a4f3a]">{icon}</div>
            <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
                <p className="text-2xl font-bold leading-none">{value}</p>
            </div>
        </div>
    )
}

function NPKBar({ label, value, max }: any) {
    const percent = Math.min((value / max) * 100, 100);
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="font-bold text-slate-400">{value} mg/kg</span>
            </div>
            <div className="h-2 w-full bg-[#e0ded6] rounded-full overflow-hidden">
                <div className="h-full bg-[#2d412d]" style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    )
}