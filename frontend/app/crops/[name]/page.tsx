'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sprout, Thermometer, Droplets, CloudRain, ArrowLeft, Loader2, Beaker } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CropDetailPage() {
    const { name } = useParams();
    const [crop, setCrop] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!name) return;

        const fetchCrop = async () => {
            try {
                const res = await axios.get(`/api/crops/${name}`);
                setCrop(res.data);
            } catch (err) {
                console.error(err);
                setError('Crop information not found.');
            } finally {
                setLoading(false);
            }
        };

        fetchCrop();
    }, [name]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="w-10 h-10 animate-spin text-[#344e41]" />
            </div>
        );
    }

    if (error || !crop) {
        return (
            <div className="text-center py-20 text-[#344e41]">
                <h2 className="text-2xl font-bold mb-4">Crop Not Found</h2>
                <Link href="/recommend" className="text-[#3a5a40] underline hover:text-[#344e41]">Go back to recommendations</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <Link href="/recommend" className="inline-flex items-center gap-2 text-[#344e41]/70 hover:text-[#344e41] mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Recommendations
            </Link>

            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-[#344e41]/10">
                {/* Header Banner */}
                <div className="bg-[#344e41] text-white p-10 relative overflow-hidden">
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                            <Sprout className="w-12 h-12 text-[#e9edc9]" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold capitalize mb-2">{crop.name}</h1>
                            <p className="text-[#dad7cd] text-lg max-w-2xl">{crop.description}</p>
                        </div>
                    </div>
                    {/* Background Decor */}
                    <Sprout className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                </div>

                <div className="p-10">
                    <h2 className="text-2xl font-bold text-[#344e41] mb-6">Ideal Growing Conditions</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ConditionCard
                            label="Nitrogen (N)"
                            min={crop.minN}
                            max={crop.maxN}
                            unit="kg/ha"
                            icon="N"
                            color="bg-[#ffb703]"
                        />
                        <ConditionCard
                            label="Phosphorus (P)"
                            min={crop.minP}
                            max={crop.maxP}
                            unit="kg/ha"
                            icon="P"
                            color="bg-[#3a5a40]"
                        />
                        <ConditionCard
                            label="Potassium (K)"
                            min={crop.minK}
                            max={crop.maxK}
                            unit="kg/ha"
                            icon="K"
                            color="bg-[#a3b18a]"
                        />
                        <ConditionCard
                            label="Temperature"
                            min={crop.minTemp}
                            max={crop.maxTemp}
                            unit="°C"
                            icon={<Thermometer className="w-5 h-5 text-white" />}
                            color="bg-orange-500"
                        />
                        <ConditionCard
                            label="Humidity"
                            min={crop.minHumid}
                            max={crop.maxHumid}
                            unit="%"
                            icon={<Droplets className="w-5 h-5 text-white" />}
                            color="bg-blue-500"
                        />
                        <ConditionCard
                            label="pH Level"
                            min={crop.minPh}
                            max={crop.maxPh}
                            unit=""
                            icon={<Beaker className="w-5 h-5 text-white" />}
                            color="bg-purple-500"
                        />
                        <ConditionCard
                            label="Rainfall"
                            min={crop.minRain}
                            max={crop.maxRain}
                            unit="mm"
                            icon={<CloudRain className="w-5 h-5 text-white" />}
                            color="bg-cyan-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ConditionCard({ label, min, max, unit, icon, color }: any) {
    return (
        <div className="bg-[#fefae0]/50 p-5 rounded-2xl border border-[#344e41]/5 hover:border-[#344e41]/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                    {icon}
                </div>
                <p className="font-bold text-[#344e41]">{label}</p>
            </div>
            <div className="pl-11">
                <p className="text-2xl font-bold text-[#344e41]">
                    {Math.round(min)} - {Math.round(max)} <span className="text-sm font-medium text-[#344e41]/60">{unit}</span>
                </p>
            </div>
        </div>
    )
}
