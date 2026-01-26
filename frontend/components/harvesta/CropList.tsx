'use client';

import React from 'react';
import { Crop, Field } from '@/types/harvesta';
import { Plus } from 'lucide-react';

interface CropListProps {
    crops: Crop[];
    field: Field;
    onAddCrop?: () => void;
}

export default function CropList({ crops, field, onAddCrop }: CropListProps) {
    return (
        <div className="bg-[#f4f1ea] p-5 rounded-3xl shadow-xl border border-white/50 w-[500px] flex gap-4 pointer-events-auto">
            {/* Optimal Zone Indicator */}
            <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                <span className="bg-[#c5e065] self-start px-2 py-1 rounded-lg text-xs font-bold text-[#2d412d]">
                    {field.humidityOptimal ? 'Optimal zone' : 'Sub-optimal'}
                </span>
                <div className="relative z-10">
                    <span className="text-5xl font-bold block mb-1 text-[#2d412d]">92%</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide">
                        {field.humidityOptimalCrop || 'FOR PLANTING'}
                    </span>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=200"
                    className="absolute -right-4 -bottom-4 w-32 h-32 object-contain opacity-20 rotate-12"
                    alt="Tractor"
                />
            </div>

            {/* Crop List */}
            <div className="flex-1 flex flex-col gap-3">
                {crops.slice(0, 3).map((crop) => (
                    <div key={crop.id} className="flex items-center gap-3 bg-white p-2 pr-4 rounded-xl shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                            {/* Placeholder for crop image */}
                            <div className="w-full h-full bg-[#dce2d3] flex items-center justify-center text-xs font-bold text-[#2d412d]">
                                {crop.label[0]}
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold capitalize text-[#2d412d]">{crop.label}</p>
                            <p className="text-[10px] text-slate-500 text-right">Yield: {crop.yieldLevel}</p>
                        </div>
                    </div>
                ))}
                <button
                    onClick={onAddCrop}
                    className="flex items-center justify-center gap-2 bg-[#c5e065] p-3 rounded-xl font-bold text-sm hover:brightness-105 transition-all text-[#2d412d]"
                >
                    <Plus size={16} /> Add Crop
                </button>
            </div>
        </div>
    );
}
