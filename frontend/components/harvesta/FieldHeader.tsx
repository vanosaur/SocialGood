import React from 'react';
import { Field } from '@/types/harvesta';
import { CloudRain, MapPin, Search, Plus, ChevronRight } from 'lucide-react';

interface FieldHeaderProps {
    field: Field;
}

export default function FieldHeader({ field }: FieldHeaderProps) {
    return (
        <header className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-start pointer-events-none">
            {/* Field Info Pill */}
            <div className="pointer-events-auto bg-[#f4f1ea]/90 backdrop-blur-md p-2 pl-4 pr-6 rounded-full shadow-sm flex items-center gap-4 border border-[#e8e4db]">
                <button className="p-2 hover:bg-[#dce2d3] rounded-full transition-colors"><ChevronRight className="rotate-180" /></button>
                <div>
                    <h1 className="text-xl font-bold text-[#2d412d]">{field.name}</h1>
                </div>
                <div className="text-xs text-slate-500 font-mono border-l border-slate-300 pl-4">
                    {field.coordinates?.lat.toFixed(4) || '0.00'}°N<br />
                    {Math.abs(field.coordinates?.lng || 0).toFixed(4)}°W
                </div>
            </div>

            {/* Quick Stats & Actions */}
            <div className="flex gap-4 pointer-events-auto">
                <div className="bg-[#f4f1ea] px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm border border-[#e8e4db]">
                    <div className="p-2 bg-[#e8e8e8] rounded-full"><CloudRain size={16} className="text-[#2d412d]" /></div>
                    <div>
                        <p className="text-xs text-slate-500">Soil Watering</p>
                        <p className="font-bold text-[#2d412d]">{field.soilWateringIntervalHours || 0}h</p>
                    </div>
                </div>
                <div className="bg-[#f4f1ea] px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm border border-[#e8e4db]">
                    <div className="p-2 bg-[#e8e8e8] rounded-full"><MapPin size={16} className="text-[#2d412d]" /></div>
                    <div>
                        <p className="text-xs text-slate-500">Location</p>
                        <p className="font-bold text-[#2d412d]">
                            {typeof field.location === 'string' ? field.location : 'Sector Alpha'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="p-3 bg-[#e8e8e8] rounded-full hover:bg-white transition-colors shadow-sm"><Search size={20} className="text-[#2d412d]" /></button>
                    <button className="p-3 bg-[#e8e8e8] rounded-full hover:bg-white transition-colors shadow-sm"><Plus size={20} className="text-[#2d412d]" /></button>
                </div>
            </div>
        </header>
    );
}
