'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Plus, TrendingUp, Camera, X, Calendar, Leaf } from 'lucide-react';

interface Observation {
    id: string;
    growthStage: string;
    healthRating: number;
    notes: string | null;
    photoUrl?: string | null;
    createdAt: Date;
}

const DEMO_FIELD_ID = "697505a5713331ce249805e6";

export default function ObservationsPage() {
    const [showForm, setShowForm] = useState(false);
    const [observations, setObservations] = useState<Observation[]>([]);
    const [loading, setLoading] = useState(true);

    const [newObs, setNewObs] = useState({
        growthStage: 'Vegetative',
        healthRating: 7,
        notes: '',
    });

    const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity', 'Harvest'];

    useEffect(() => {
        fetchObservations();
    }, []);

    const fetchObservations = async () => {
        try {
            const res = await fetch(`/api/observations?fieldId=${DEMO_FIELD_ID}`);
            const data = await res.json();
            setObservations(data.observations || []);
        } catch (error) {
            console.error('Error fetching observations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        try {
            const res = await fetch('/api/observations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fieldId: DEMO_FIELD_ID,
                    ...newObs,
                }),
            });

            if (res.ok) {
                await fetchObservations();
                setShowForm(false);
                setNewObs({ growthStage: 'Vegetative', healthRating: 7, notes: '' });
            }
        } catch (error) {
            console.error('Error adding observation:', error);
        }
    };

    const avgHealth = observations.length > 0
        ? observations.reduce((sum, obs) => sum + obs.healthRating, 0) / observations.length
        : 0;

    const getHealthColor = (rating: number) => {
        if (rating >= 8) return 'from-green-400 to-emerald-500';
        if (rating >= 6) return 'from-yellow-400 to-orange-400';
        return 'from-red-400 to-pink-500';
    };

    const getHealthBg = (rating: number) => {
        if (rating >= 8) return 'from-green-50 to-emerald-50 border-green-200';
        if (rating >= 6) return 'from-yellow-50 to-orange-50 border-yellow-200';
        return 'from-red-50 to-pink-50 border-red-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f1ea] via-[#e8e4db] to-[#dce2d3] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2d412d] mb-2">Field Observation Journal</h1>
                    <p className="text-slate-600">Track crop health and growth progress over time</p>
                </div>

                {/* Health Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-green-900">Average Health Score</h3>
                            <TrendingUp className="text-green-600" size={24} />
                        </div>
                        <div className="flex items-end gap-3">
                            <p className="text-5xl font-bold text-green-700">{avgHealth.toFixed(1)}</p>
                            <p className="text-2xl text-green-600 mb-1">/10</p>
                        </div>
                        <p className="text-sm text-green-600 mt-2">Based on {observations.length} observations</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-blue-900">Current Growth Stage</h3>
                            <Leaf className="text-blue-600" size={24} />
                        </div>
                        <p className="text-3xl font-bold text-blue-700 mb-2">{observations[0]?.growthStage || 'N/A'}</p>
                        <p className="text-sm text-blue-600">
                            {observations[0] ? `Last updated ${new Date(observations[0].createdAt).toLocaleDateString()}` : 'No observations yet'}
                        </p>
                    </div>
                </div>

                {/* Observations Timeline */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#2d412d]">Observation Timeline</h2>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                        >
                            <Plus size={20} />
                            Add Observation
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8 text-slate-500">Loading observations...</div>
                    ) : observations.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            No observations yet. Click "Add Observation" to start tracking!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {observations.map((obs, index) => (
                                <div
                                    key={obs.id}
                                    className={`p-6 bg-gradient-to-br ${getHealthBg(obs.healthRating)} rounded-2xl border-2 hover:shadow-lg transition-all`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getHealthColor(obs.healthRating)} flex items-center justify-center shadow-lg`}>
                                                <span className="text-3xl font-bold text-white">{obs.healthRating}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-[#2d412d] mb-1">{obs.growthStage}</h3>
                                                <p className="text-sm text-slate-600 flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {new Date(obs.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        {index === 0 && (
                                            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">Latest</span>
                                        )}
                                    </div>

                                    {obs.notes && (
                                        <p className="text-slate-700 leading-relaxed mb-3">{obs.notes}</p>
                                    )}

                                    {obs.photoUrl && (
                                        <div className="mt-4">
                                            <img src={obs.photoUrl} alt="Field observation" className="rounded-xl w-full max-h-64 object-cover" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Observation Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-[#2d412d]">Add Field Observation</h3>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Growth Stage</label>
                                    <select
                                        value={newObs.growthStage}
                                        onChange={(e) => setNewObs({ ...newObs, growthStage: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-400 outline-none font-semibold"
                                    >
                                        {growthStages.map(stage => (
                                            <option key={stage} value={stage}>{stage}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Health Rating: <span className="text-2xl font-bold text-green-600">{newObs.healthRating}/10</span>
                                    </label>
                                    <input
                                        type="range"
                                        value={newObs.healthRating}
                                        onChange={(e) => setNewObs({ ...newObs, healthRating: parseInt(e.target.value) })}
                                        min="1"
                                        max="10"
                                        step="1"
                                        className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>Poor</span>
                                        <span>Excellent</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Observations & Notes</label>
                                    <textarea
                                        value={newObs.notes}
                                        onChange={(e) => setNewObs({ ...newObs, notes: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-400 outline-none resize-none"
                                        rows={4}
                                        placeholder="Describe what you observed... (pest sightings, color changes, growth patterns, etc.)"
                                    />
                                </div>

                                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Camera className="text-blue-600" size={20} />
                                        <span className="font-semibold text-blue-900">Photo Upload (Coming Soon)</span>
                                    </div>
                                    <p className="text-sm text-blue-700">Photo upload feature will be available in the next update</p>
                                </div>

                                <button
                                    onClick={handleAdd}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Add Observation
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
