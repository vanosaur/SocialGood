import React from 'react';
import { BarChart3, TrendingUp, Calendar, Download, FileText } from 'lucide-react';

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f1ea] via-[#e8e4db] to-[#dce2d3] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2d412d] mb-2">Reports & Analytics</h1>
                    <p className="text-slate-600">View insights and download reports for your farm</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 shadow-lg">
                        <TrendingUp className="text-green-600 mb-3" size={24} />
                        <p className="text-sm text-green-700 font-semibold mb-1">Total Yield</p>
                        <p className="text-3xl font-bold text-green-800">2,450 kg</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg">
                        <BarChart3 className="text-blue-600 mb-3" size={24} />
                        <p className="text-sm text-blue-700 font-semibold mb-1">Water Saved</p>
                        <p className="text-3xl font-bold text-blue-800">30%</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-6 shadow-lg">
                        <FileText className="text-orange-600 mb-3" size={24} />
                        <p className="text-sm text-orange-700 font-semibold mb-1">Reports Generated</p>
                        <p className="text-3xl font-bold text-orange-800">12</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-6 shadow-lg">
                        <Calendar className="text-purple-600 mb-3" size={24} />
                        <p className="text-sm text-purple-700 font-semibold mb-1">Days Tracked</p>
                        <p className="text-3xl font-bold text-purple-800">45</p>
                    </div>
                </div>

                {/* Available Reports */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50">
                    <h2 className="text-2xl font-bold text-[#2d412d] mb-6">Available Reports</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: 'Monthly Crop Performance', desc: 'Yield, health, and growth metrics', icon: TrendingUp, color: 'green' },
                            { title: 'Water Usage Analysis', desc: 'Irrigation efficiency and savings', icon: BarChart3, color: 'blue' },
                            { title: 'Fertilizer Application Log', desc: 'NPK balance and application history', icon: FileText, color: 'orange' },
                            { title: 'Pest Management Summary', desc: 'Pest incidents and treatments', icon: FileText, color: 'red' },
                            { title: 'Climate Impact Report', desc: 'Weather effects on crop health', icon: Calendar, color: 'purple' },
                            { title: 'Field Observations Timeline', desc: 'Daily health tracking summary', icon: FileText, color: 'cyan' },
                        ].map((report, i) => (
                            <div
                                key={i}
                                className={`p-6 bg-gradient-to-br from-${report.color}-50 to-${report.color}-100 border-2 border-${report.color}-200 rounded-2xl hover:shadow-lg transition-all cursor-pointer group`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <report.icon className={`text-${report.color}-600`} size={24} />
                                    <button className="flex items-center gap-2 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>
                                <h3 className="font-bold text-[#2d412d] mb-2">{report.title}</h3>
                                <p className="text-sm text-slate-600">{report.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-3xl p-6">
                    <h3 className="font-bold text-blue-900 mb-2">📊 Coming Soon</h3>
                    <p className="text-sm text-blue-800">
                        Advanced analytics, custom report builder, and automated email reports will be available in the next update.
                    </p>
                </div>

            </div>
        </div>
    );
}
