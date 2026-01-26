import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets, AlertTriangle } from 'lucide-react';

// Mock weather data
const forecast = [
    { day: 'Today', temp: 24, condition: 'Sunny', precipitation: 0, humidity: 62, icon: Sun },
    { day: 'Mon', temp: 26, condition: 'Partly Cloudy', precipitation: 10, humidity: 58, icon: Cloud },
    { day: 'Tue', temp: 22, condition: 'Rainy', precipitation: 80, humidity: 75, icon: CloudRain },
    { day: 'Wed', temp: 23, condition: 'Cloudy', precipitation: 30, humidity: 68, icon: Cloud },
    { day: 'Thu', temp: 25, condition: 'Sunny', precipitation: 5, humidity: 60, icon: Sun },
    { day: 'Fri', temp: 27, condition: 'Sunny', precipitation: 0, humidity: 55, icon: Sun },
    { day: 'Sat', temp: 28, condition: 'Hot', precipitation: 0, humidity: 50, icon: Sun },
];

const alerts = [
    { type: 'warning', title: 'Heavy Rain Expected', message: 'Postpone irrigation scheduled for Tuesday', icon: CloudRain },
    { type: 'info', title: 'Optimal Growing Conditions', message: 'Next 3 days ideal for crop development', icon: Sun },
];

export default function ClimatePage() {
    return (
        <div className="min-h-screen bg-[#f4f1ea] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2d412d] mb-2">Climate & Weather</h1>
                    <p className="text-slate-600">7-day forecast and climate impact analysis</p>
                </div>

                {/* Alerts */}
                {alerts.length > 0 && (
                    <div className="mb-6 space-y-3">
                        {alerts.map((alert, i) => (
                            <div
                                key={i}
                                className={`rounded-3xl p-5 border-2 flex items-start gap-4 ${alert.type === 'warning'
                                        ? 'bg-orange-50 border-orange-200'
                                        : 'bg-blue-50 border-blue-200'
                                    }`}
                            >
                                <alert.icon className={alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'} size={24} />
                                <div className="flex-1">
                                    <h3 className={`font-bold mb-1 ${alert.type === 'warning' ? 'text-orange-900' : 'text-blue-900'}`}>
                                        {alert.title}
                                    </h3>
                                    <p className={`text-sm ${alert.type === 'warning' ? 'text-orange-800' : 'text-blue-800'}`}>
                                        {alert.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 7-Day Forecast */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#dce2d3] mb-6">
                    <h2 className="text-xl font-bold text-[#2d412d] mb-6">7-Day Forecast</h2>

                    <div className="grid grid-cols-7 gap-4">
                        {forecast.map((day, i) => (
                            <div
                                key={i}
                                className={`p-4 rounded-2xl text-center transition-all ${i === 0
                                        ? 'bg-green-100 border-2 border-green-300'
                                        : 'bg-[#f4f1ea] hover:bg-[#e8e4db]'
                                    }`}
                            >
                                <p className="text-sm font-semibold text-[#2d412d] mb-3">{day.day}</p>
                                <day.icon className="mx-auto text-[#3a5a40] mb-3" size={32} />
                                <p className="text-2xl font-bold text-[#2d412d] mb-2">{day.temp}°C</p>
                                <p className="text-xs text-slate-600 mb-2">{day.condition}</p>
                                <div className="flex items-center justify-center gap-1 text-xs text-blue-600">
                                    <Droplets size={12} />
                                    <span>{day.precipitation}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Current Conditions */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#dce2d3]">
                        <h2 className="text-xl font-bold text-[#2d412d] mb-6">Current Conditions</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#f4f1ea] p-4 rounded-2xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Thermometer className="text-red-500" size={20} />
                                    <span className="text-sm text-slate-600">Temperature</span>
                                </div>
                                <p className="text-3xl font-bold text-[#2d412d]">24°C</p>
                                <p className="text-xs text-slate-500 mt-1">Feels like 26°C</p>
                            </div>

                            <div className="bg-[#f4f1ea] p-4 rounded-2xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Droplets className="text-blue-500" size={20} />
                                    <span className="text-sm text-slate-600">Humidity</span>
                                </div>
                                <p className="text-3xl font-bold text-[#2d412d]">62%</p>
                                <p className="text-xs text-slate-500 mt-1">Moderate</p>
                            </div>

                            <div className="bg-[#f4f1ea] p-4 rounded-2xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wind className="text-slate-500" size={20} />
                                    <span className="text-sm text-slate-600">Wind Speed</span>
                                </div>
                                <p className="text-3xl font-bold text-[#2d412d]">12 km/h</p>
                                <p className="text-xs text-slate-500 mt-1">Light breeze</p>
                            </div>

                            <div className="bg-[#f4f1ea] p-4 rounded-2xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <CloudRain className="text-blue-600" size={20} />
                                    <span className="text-sm text-slate-600">Precipitation</span>
                                </div>
                                <p className="text-3xl font-bold text-[#2d412d]">0 mm</p>
                                <p className="text-xs text-slate-500 mt-1">No rain</p>
                            </div>
                        </div>
                    </div>

                    {/* Impact Analysis */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#dce2d3]">
                        <h2 className="text-xl font-bold text-[#2d412d] mb-6">Climate Impact</h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-green-900">Corn Growth</span>
                                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">Optimal</span>
                                </div>
                                <p className="text-sm text-green-800">
                                    Current temperature (24°C) and humidity (62%) are ideal for corn development.
                                </p>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-orange-900">Soybean Growth</span>
                                    <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-medium">Monitor</span>
                                </div>
                                <p className="text-sm text-orange-800">
                                    Expected rain on Tuesday may cause waterlogging. Ensure proper drainage.
                                </p>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-blue-900">Pest Risk</span>
                                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">Low</span>
                                </div>
                                <p className="text-sm text-blue-800">
                                    Dry conditions reduce fungal disease risk. Continue monitoring.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
