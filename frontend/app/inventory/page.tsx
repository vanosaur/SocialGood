'use client';

import React, { useState, useEffect } from 'react';
import { Package, Plus, TrendingUp, Leaf, X, Calendar } from 'lucide-react';

interface FertilizerApp {
    id: string;
    type: string;
    amount: number;
    nitrogen: number | null;
    phosphorus: number | null;
    potassium: number | null;
    notes: string | null;
    appliedAt: Date;
}

const DEMO_FIELD_ID = "697505a5713331ce249805e6";

export default function InventoryPage() {
    const [showForm, setShowForm] = useState(false);
    const [applications, setApplications] = useState<FertilizerApp[]>([]);
    const [loading, setLoading] = useState(true);

    const [newApp, setNewApp] = useState({
        type: 'NPK 10-26-26',
        amount: 0,
        nitrogen: 10,
        phosphorus: 26,
        potassium: 26,
        notes: '',
    });

    const fertilizerTypes = [
        { name: 'NPK 10-26-26', N: 10, P: 26, K: 26 },
        { name: 'NPK 20-20-20', N: 20, P: 20, K: 20 },
        { name: 'Urea (46-0-0)', N: 46, P: 0, K: 0 },
        { name: 'DAP (18-46-0)', N: 18, P: 46, K: 0 },
        { name: 'Organic Compost', N: 2, P: 1, K: 1 },
    ];

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await fetch(`/api/fertilizer?fieldId=${DEMO_FIELD_ID}`);
            const data = await res.json();
            setApplications(data.applications || []);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        try {
            const res = await fetch('/api/fertilizer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fieldId: DEMO_FIELD_ID,
                    ...newApp,
                }),
            });

            if (res.ok) {
                await fetchApplications();
                setShowForm(false);
                setNewApp({ type: 'NPK 10-26-26', amount: 0, nitrogen: 10, phosphorus: 26, potassium: 26, notes: '' });
            }
        } catch (error) {
            console.error('Error adding application:', error);
        }
    };

    // Calculate total NPK applied
    const totalNPK = applications.reduce((acc, app) => ({
        N: acc.N + (app.amount * (app.nitrogen || 0) / 100),
        P: acc.P + (app.amount * (app.phosphorus || 0) / 100),
        K: acc.K + (app.amount * (app.potassium || 0) / 100),
    }), { N: 0, P: 0, K: 0 });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f1ea] via-[#e8e4db] to-[#dce2d3] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2d412d] mb-2">Fertilizer Inventory</h1>
                    <p className="text-slate-600">Track fertilizer applications and monitor NPK balance</p>
                </div>

                {/* NPK Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-green-900">Total Nitrogen (N)</h3>
                            <Leaf className="text-green-600" size={24} />
                        </div>
                        <p className="text-4xl font-bold text-green-700">{totalNPK.N.toFixed(1)} kg</p>
                        <p className="text-sm text-green-600 mt-2">Applied this season</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-blue-900">Total Phosphorus (P)</h3>
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                        <p className="text-4xl font-bold text-blue-700">{totalNPK.P.toFixed(1)} kg</p>
                        <p className="text-sm text-blue-600 mt-2">Applied this season</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-orange-900">Total Potassium (K)</h3>
                            <Package className="text-orange-600" size={24} />
                        </div>
                        <p className="text-4xl font-bold text-orange-700">{totalNPK.K.toFixed(1)} kg</p>
                        <p className="text-sm text-orange-600 mt-2">Applied this season</p>
                    </div>
                </div>

                {/* Application History */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#2d412d]">Application History</h2>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                        >
                            <Plus size={20} />
                            Log Application
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8 text-slate-500">Loading applications...</div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            No applications logged yet. Click "Log Application" to add one!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {applications.map((app) => (
                                <div
                                    key={app.id}
                                    className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border-2 border-slate-200 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-[#2d412d] mb-1">{app.type}</h3>
                                            <p className="text-sm text-slate-600 flex items-center gap-2">
                                                <Calendar size={14} />
                                                {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-green-600">{app.amount} kg</p>
                                            <p className="text-xs text-slate-500">Amount Applied</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-3">
                                        <div className="bg-green-100 p-3 rounded-xl">
                                            <p className="text-xs text-green-700 font-semibold mb-1">Nitrogen</p>
                                            <p className="text-lg font-bold text-green-800">{app.nitrogen || 0}%</p>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-xl">
                                            <p className="text-xs text-blue-700 font-semibold mb-1">Phosphorus</p>
                                            <p className="text-lg font-bold text-blue-800">{app.phosphorus || 0}%</p>
                                        </div>
                                        <div className="bg-orange-100 p-3 rounded-xl">
                                            <p className="text-xs text-orange-700 font-semibold mb-1">Potassium</p>
                                            <p className="text-lg font-bold text-orange-800">{app.potassium || 0}%</p>
                                        </div>
                                    </div>

                                    {app.notes && (
                                        <p className="text-sm text-slate-600 italic">📝 {app.notes}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Application Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-[#2d412d]">Log Fertilizer Application</h3>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Fertilizer Type</label>
                                    <select
                                        value={newApp.type}
                                        onChange={(e) => {
                                            const selected = fertilizerTypes.find(f => f.name === e.target.value);
                                            setNewApp({
                                                ...newApp,
                                                type: e.target.value,
                                                nitrogen: selected?.N || 0,
                                                phosphorus: selected?.P || 0,
                                                potassium: selected?.K || 0,
                                            });
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-400 outline-none font-semibold"
                                    >
                                        {fertilizerTypes.map(f => (
                                            <option key={f.name} value={f.name}>{f.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (kg)</label>
                                    <input
                                        type="number"
                                        value={newApp.amount}
                                        onChange={(e) => setNewApp({ ...newApp, amount: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-400 outline-none font-semibold"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-green-700 mb-2">N %</label>
                                        <input
                                            type="number"
                                            value={newApp.nitrogen}
                                            onChange={(e) => setNewApp({ ...newApp, nitrogen: parseFloat(e.target.value) })}
                                            className="w-full px-3 py-2 rounded-xl border-2 border-green-200 focus:border-green-400 outline-none font-semibold text-sm"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-blue-700 mb-2">P %</label>
                                        <input
                                            type="number"
                                            value={newApp.phosphorus}
                                            onChange={(e) => setNewApp({ ...newApp, phosphorus: parseFloat(e.target.value) })}
                                            className="w-full px-3 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-400 outline-none font-semibold text-sm"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-orange-700 mb-2">K %</label>
                                        <input
                                            type="number"
                                            value={newApp.potassium}
                                            onChange={(e) => setNewApp({ ...newApp, potassium: parseFloat(e.target.value) })}
                                            className="w-full px-3 py-2 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none font-semibold text-sm"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Notes (Optional)</label>
                                    <textarea
                                        value={newApp.notes}
                                        onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-400 outline-none resize-none"
                                        rows={3}
                                        placeholder="e.g., Applied to corn field, north section"
                                    />
                                </div>

                                <button
                                    onClick={handleAdd}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Log Application
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
