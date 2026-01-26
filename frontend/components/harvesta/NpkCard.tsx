import React from 'react';
import { NpkLevels } from '@/types/harvesta';

interface NpkCardProps {
    npk: NpkLevels;
}

function NPKBar({ label, value, max }: { label: string; value: number; max: number }) {
    const percent = Math.min((value / max) * 100, 100);
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="font-bold text-slate-400">{value}/{max}</span>
            </div>
            <div className="h-2 w-full bg-[#e0ded6] rounded-full overflow-hidden">
                <div className="h-full bg-[#2d412d]" style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    )
}

export default function NpkCard({ npk }: NpkCardProps) {
    return (
        <div className="bg-[#f4f1ea] p-6 rounded-3xl shadow-xl border border-white/50 pointer-events-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-[#2d412d]">NPK Levels</h3>
                    <p className="text-xs text-slate-500">{npk.weekLabel}</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-[#c5e065] px-3 py-1 rounded-full text-xs font-bold text-[#2d412d]">Analysis</span>
                    <span className="bg-white/50 px-3 py-1 rounded-full text-xs font-bold text-slate-500">Record</span>
                </div>
            </div>
            <div className="space-y-4">
                <NPKBar label="Nitrogen" value={npk.nitrogen.current} max={npk.nitrogen.max} />
                <NPKBar label="Phosphorus" value={npk.phosphorus.current} max={npk.phosphorus.max} />
                <NPKBar label="Potassium" value={npk.potassium.current} max={npk.potassium.max} />
            </div>
        </div>
    );
}
