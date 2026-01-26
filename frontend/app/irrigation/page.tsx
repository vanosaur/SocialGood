'use client';

import React, { useState, useEffect } from 'react';
import { Droplets, Calendar, Play, Pause, TrendingUp, AlertCircle, Plus, Clock, Repeat, X } from 'lucide-react';

interface Schedule {
    id: string;
    time: string;
    duration: number;
    frequency: string;
    active: boolean;
}

const DEMO_FIELD_ID = "697505a5713331ce249805e6"; // Using seeded field

export default function IrrigationPage() {
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);

    const [newSchedule, setNewSchedule] = useState({
        time: '06:00',
        duration: 30,
        frequency: 'Daily',
    });

    const currentMoisture = 62;
    const optimalRange = { min: 60, max: 80 };
    const isOptimal = currentMoisture >= optimalRange.min && currentMoisture <= optimalRange.max;

    const moistureData = [
        { day: 'Mon', value: 65 },
        { day: 'Tue', value: 58 },
        { day: 'Wed', value: 72 },
        { day: 'Thu', value: 68 },
        { day: 'Fri', value: 62 },
        { day: 'Sat', value: 70 },
        { day: 'Sun', value: 75 },
    ];

    // Fetch schedules on mount
    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const res = await fetch(`/api/schedules?fieldId=${DEMO_FIELD_ID}`);
            const data = await res.json();
            setSchedules(data.schedules || []);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSchedule = async () => {
        try {
            const res = await fetch('/api/schedules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fieldId: DEMO_FIELD_ID,
                    ...newSchedule,
                }),
            });

            if (res.ok) {
                await fetchSchedules();
                setShowScheduleForm(false);
                setNewSchedule({ time: '06:00', duration: 30, frequency: 'Daily' });
            }
        } catch (error) {
            console.error('Error adding schedule:', error);
        }
    };

    const toggleSchedule = async (id: string, currentActive: boolean) => {
        try {
            const res = await fetch('/api/schedules', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, active: !currentActive }),
            });

            if (res.ok) {
                await fetchSchedules();
            }
        } catch (error) {
            console.error('Error toggling schedule:', error);
        }
    };

    const deleteSchedule = async (id: string) => {
        try {
            const res = await fetch(`/api/schedules?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await fetchSchedules();
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f1ea] via-[#e8e4db] to-[#dce2d3] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2d412d] mb-2">Irrigation Management</h1>
                    <p className="text-slate-600">Smart watering schedules and soil moisture tracking</p>
                </div>

                {/* Current Status Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-2xl ${isOptimal ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-orange-400 to-red-500'}`}>
                                <Droplets className="text-white" size={32} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Current Soil Moisture</p>
                                <p className="text-4xl font-bold text-[#2d412d]">{currentMoisture}%</p>
                                <p className="text-xs text-slate-500 mt-1">Optimal: {optimalRange.min}-{optimalRange.max}%</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                                <Play size={18} />
                                Start Irrigation
                            </button>
                            <button className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-colors">
                                <Pause size={18} />
                                Stop
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Moisture Chart */}
                    <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-[#2d412d]">7-Day Moisture Trend</h2>
                            <TrendingUp className="text-green-600" size={20} />
                        </div>

                        <div className="flex items-end justify-between h-64 gap-4">
                            {moistureData.map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-[#e8e4db] rounded-t-lg relative" style={{ height: '100%' }}>
                                        <div
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all"
                                            style={{ height: `${item.value}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600">{item.day}</span>
                                    <span className="text-xs text-slate-400">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Irrigation Schedule */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-[#2d412d]" size={20} />
                                <h2 className="text-xl font-bold text-[#2d412d]">Schedule</h2>
                            </div>
                            <button
                                onClick={() => setShowScheduleForm(true)}
                                className="p-2 bg-green-100 hover:bg-green-200 rounded-xl transition-colors"
                            >
                                <Plus className="text-green-700" size={20} />
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-8 text-slate-500">Loading schedules...</div>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {schedules.length === 0 ? (
                                    <div className="text-center py-8 text-slate-500">
                                        No schedules yet. Click + to add one!
                                    </div>
                                ) : (
                                    schedules.map((schedule) => (
                                        <div
                                            key={schedule.id}
                                            className={`p-4 rounded-2xl border-2 transition-all ${schedule.active
                                                    ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                                                    : 'bg-slate-50 border-slate-200 opacity-60'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-blue-600" />
                                                    <span className="font-semibold text-sm text-[#2d412d]">{schedule.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => toggleSchedule(schedule.id, schedule.active)}
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${schedule.active
                                                                ? 'bg-green-200 text-green-800'
                                                                : 'bg-slate-200 text-slate-700'
                                                            }`}
                                                    >
                                                        {schedule.active ? 'Active' : 'Paused'}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteSchedule(schedule.id)}
                                                        className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        <X size={14} className="text-red-600" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-slate-600">
                                                <span>⏱️ {schedule.duration} min</span>
                                                <span className="flex items-center gap-1">
                                                    <Repeat size={12} />
                                                    {schedule.frequency}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                </div>

                {/* Add Schedule Modal */}
                {showScheduleForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-[#2d412d]">Add Irrigation Schedule</h3>
                                <button
                                    onClick={() => setShowScheduleForm(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Time</label>
                                    <input
                                        type="time"
                                        value={newSchedule.time}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 outline-none font-semibold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (minutes)</label>
                                    <input
                                        type="number"
                                        value={newSchedule.duration}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, duration: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 outline-none font-semibold"
                                        min="5"
                                        max="180"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Frequency</label>
                                    <select
                                        value={newSchedule.frequency}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 outline-none font-semibold"
                                    >
                                        <option>Daily</option>
                                        <option>Every 2 days</option>
                                        <option>Every 3 days</option>
                                        <option>Weekly</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleAddSchedule}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Add Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-blue-900 mb-2">AI Recommendation</h3>
                            <p className="text-sm text-blue-800">
                                Based on current moisture levels (62%) and weather forecast, we recommend irrigating
                                for 45 minutes at 6:00 PM today. Soil moisture is slightly below optimal range.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
