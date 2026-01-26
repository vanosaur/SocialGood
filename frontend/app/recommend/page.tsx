'use client';

import React, { useState } from 'react';
import { Sprout, TrendingUp, Droplets, Thermometer, CloudRain, Beaker, Sparkles, Award } from 'lucide-react';

interface CropRecommendation {
    crop: string;
    probability: number;
}

export default function RecommendPage() {
    const [formData, setFormData] = useState({
        N: '70',
        P: '50',
        K: '50',
        temperature: '25',
        humidity: '70',
        ph: '6.5',
        rainfall: '150',
    });

    const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    N: parseFloat(formData.N),
                    P: parseFloat(formData.P),
                    K: parseFloat(formData.K),
                    temperature: parseFloat(formData.temperature),
                    humidity: parseFloat(formData.humidity),
                    ph: parseFloat(formData.ph),
                    rainfall: parseFloat(formData.rainfall),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get recommendations');
            }

            const data = await response.json();
            setRecommendations(data.recommendations || []);
        } catch (err) {
            setError('Failed to connect to ML service. Make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f1ea] via-[#e8e4db] to-[#dce2d3] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header with gradient */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Sparkles size={16} />
                        AI-Powered Analysis
                    </div>
                    <h1 className="text-4xl font-bold text-[#2d412d] mb-3 bg-gradient-to-r from-[#2d412d] to-[#3a5a40] bg-clip-text text-transparent">
                        Smart Crop Recommendation
                    </h1>
                    <p className="text-slate-600 text-lg">Enter your soil and climate data to discover the best crops for your field</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Input Form - Enhanced */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl">
                                <Beaker className="text-white" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#2d412d]">Field Data</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* NPK Levels - Enhanced Sliders */}
                            <div className="space-y-5 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                                <h3 className="font-bold text-green-900 flex items-center gap-2">
                                    <Beaker size={18} />
                                    Soil Nutrients (NPK)
                                </h3>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-semibold text-slate-700">Nitrogen (N)</label>
                                        <span className="text-xl font-bold text-green-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                                            {formData.N}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        name="N"
                                        value={formData.N}
                                        onChange={handleChange}
                                        min="0"
                                        max="140"
                                        step="1"
                                        className="w-full h-3 bg-gradient-to-r from-green-200 to-green-400 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>0 mg/kg</span>
                                        <span>140 mg/kg</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-semibold text-slate-700">Phosphorus (P)</label>
                                        <span className="text-xl font-bold text-blue-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                                            {formData.P}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        name="P"
                                        value={formData.P}
                                        onChange={handleChange}
                                        min="5"
                                        max="145"
                                        step="1"
                                        className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>5 mg/kg</span>
                                        <span>145 mg/kg</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-semibold text-slate-700">Potassium (K)</label>
                                        <span className="text-xl font-bold text-orange-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                                            {formData.K}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        name="K"
                                        value={formData.K}
                                        onChange={handleChange}
                                        min="5"
                                        max="205"
                                        step="1"
                                        className="w-full h-3 bg-gradient-to-r from-orange-200 to-orange-400 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>5 mg/kg</span>
                                        <span>205 mg/kg</span>
                                    </div>
                                </div>
                            </div>

                            {/* Climate Data - Enhanced */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Thermometer size={16} className="text-red-500" />
                                        Temperature
                                    </label>
                                    <input
                                        type="number"
                                        name="temperature"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        required
                                        step="0.1"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-400 outline-none bg-white font-semibold text-lg"
                                        placeholder="°C"
                                    />
                                </div>
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Droplets size={16} className="text-blue-500" />
                                        Humidity
                                    </label>
                                    <input
                                        type="number"
                                        name="humidity"
                                        value={formData.humidity}
                                        onChange={handleChange}
                                        required
                                        step="0.1"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 outline-none bg-white font-semibold text-lg"
                                        placeholder="%"
                                    />
                                </div>
                            </div>

                            {/* pH & Rainfall */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                                    <label className="text-sm font-semibold text-slate-700 mb-2 block">pH Level</label>
                                    <input
                                        type="number"
                                        name="ph"
                                        value={formData.ph}
                                        onChange={handleChange}
                                        required
                                        step="0.1"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none bg-white font-semibold text-lg"
                                        placeholder="3.5-9.9"
                                    />
                                </div>
                                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <CloudRain size={16} className="text-cyan-500" />
                                        Rainfall
                                    </label>
                                    <input
                                        type="number"
                                        name="rainfall"
                                        value={formData.rainfall}
                                        onChange={handleChange}
                                        required
                                        step="0.1"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-400 outline-none bg-white font-semibold text-lg"
                                        placeholder="mm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        Get AI Recommendations
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-800 text-sm animate-shake">
                                    ⚠️ {error}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Results - Enhanced */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl">
                                <Award className="text-white" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#2d412d]">Top Recommendations</h2>
                        </div>

                        {recommendations.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse" />
                                    <Sprout className="mx-auto text-green-300 relative" size={80} />
                                </div>
                                <p className="text-slate-500 text-lg">Fill in your field data to discover the perfect crops</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recommendations.map((rec, i) => (
                                    <div
                                        key={i}
                                        className={`p-6 rounded-2xl border-2 transform transition-all hover:scale-105 ${i === 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg' :
                                                i === 1 ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' :
                                                    'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${i === 0 ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                                                        i === 1 ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                                                            'bg-gradient-to-br from-slate-400 to-gray-500'
                                                    }`}>
                                                    {i === 0 ? <Award className="text-white" size={28} /> :
                                                        <span className="text-2xl font-bold text-white">{i + 1}</span>}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#2d412d] capitalize">{rec.crop}</h3>
                                                    <p className="text-xs text-slate-500">Recommended Crop</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp size={20} className="text-green-600" />
                                                    <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                        {(rec.probability * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 font-semibold">Success Rate</p>
                                            </div>
                                        </div>

                                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-1000 ${i === 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                                        i === 1 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                                                            'bg-gradient-to-r from-slate-400 to-gray-500'
                                                    }`}
                                                style={{ width: `${rec.probability * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* Info Cards - Enhanced */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-3">💡</div>
                        <h3 className="font-bold text-blue-900 mb-2 text-lg">How it works</h3>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            Our AI analyzes your soil nutrients, climate conditions, and pH levels using machine learning to recommend crops with the highest success probability.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-3">🌱</div>
                        <h3 className="font-bold text-green-900 mb-2 text-lg">Get soil tested</h3>
                        <p className="text-sm text-green-800 leading-relaxed">
                            For accurate results, get your soil tested at a local agricultural lab. Most tests cost $10-30 and provide NPK, pH values.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-3">📊</div>
                        <h3 className="font-bold text-orange-900 mb-2 text-lg">Typical ranges</h3>
                        <p className="text-sm text-orange-800 leading-relaxed">
                            N: 0-140, P: 5-145, K: 5-205 mg/kg • pH: 3.5-9.9 • Temp: 8-44°C • Humidity: 14-100%
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
