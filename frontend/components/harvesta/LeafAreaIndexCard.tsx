import React from 'react';
import { LeafAreaIndexPoint } from '@/types/harvesta';
import { ArrowUpRight } from 'lucide-react';

interface LeafAreaIndexCardProps {
    data: LeafAreaIndexPoint[];
}

function CircleChart({ value, label, color, active }: { value: number; label: string; color: string; active?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center relative ${active ? 'scale-110 shadow-lg' : 'opacity-70'}`}
                style={{ borderColor: color, borderStyle: active ? 'solid' : 'dashed' }}
            >
                <span className="font-bold text-lg">{value}</span>
            </div>
            <span className="text-[10px] mt-2 uppercase tracking-wider font-medium">{label}</span>
        </div>
    )
}

export default function LeafAreaIndexCard({ data }: LeafAreaIndexCardProps) {
    // Colors for specific indices (hardcoded for visual matching for now)
    const colors = ["#e6a45c", "#c5e065", "#a3b18a"];

    return (
        <div className="bg-[#3a4f3a] text-[#f4f1ea] p-6 rounded-3xl shadow-xl h-full flex flex-col pointer-events-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium opacity-90">Leaf area index</h3>
                <ArrowUpRight className="bg-[#c5e065] text-[#2d412d] p-1 rounded-full w-6 h-6" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-4">
                {data.map((point, i) => (
                    <CircleChart
                        key={i}
                        value={point.value}
                        label={point.weekLabel}
                        color={colors[i % colors.length]}
                        active={point.isCurrentWeek}
                    />
                ))}
            </div>
        </div>
    );
}
