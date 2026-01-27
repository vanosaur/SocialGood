import React from 'react';
import { Field } from '@/types/harvesta';
import { Sprout, ArrowUpRight, Droplets } from 'lucide-react';

interface FieldStatsProps {
    field: Field;
}

function StatPill({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="bg-[#f4f1ea] px-5 py-3 rounded-2xl flex items-center gap-4 shadow-lg border border-white/50 min-w-[180px]">
            <div className="bg-[#dad7cd] p-2 rounded-full text-[#3a4f3a]">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
                <p className="text-2xl font-bold leading-none text-[#2d412d]">{value}</p>
            </div>
        </div>
    )
}

export default function FieldStats({ field }: FieldStatsProps) {
    return (
        <div className="flex gap-6 mb-6 pointer-events-auto">
            <StatPill label="Planted area" value={`${field.plantedAreaHa}ha`} icon={<Sprout size={18} />} />
            <StatPill label="Current NDVI" value={(field.ndvi || 0).toString()} icon={<ArrowUpRight size={18} />} />
            <StatPill label="Humidity" value={`${field.humidity}%`} icon={<Droplets size={18} />} />
        </div>
    );
}
