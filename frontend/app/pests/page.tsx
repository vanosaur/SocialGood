import React from 'react';
import { Bug, AlertTriangle, CheckCircle, Calendar, Sprout } from 'lucide-react';

// Mock pest data
const activePests = [
    {
        name: 'Corn Borer',
        severity: 'high',
        affectedCrops: ['Corn'],
        detected: '2 days ago',
        description: 'Larvae feeding on corn stalks'
    },
    {
        name: 'Aphids',
        severity: 'medium',
        affectedCrops: ['Soybean', 'Corn'],
        detected: '5 days ago',
        description: 'Small green insects on leaves'
    },
];

const treatments = [
    { date: 'Jan 20, 2026', pest: 'Aphids', method: 'Neem Oil Spray', effectiveness: 'Effective', status: 'completed' },
    { date: 'Jan 22, 2026', pest: 'Corn Borer', method: 'Bt Pesticide', effectiveness: 'Pending', status: 'ongoing' },
];

const preventionTips = [
    { title: 'Crop Rotation', description: 'Rotate crops annually to disrupt pest life cycles' },
    { title: 'Natural Predators', description: 'Encourage ladybugs and lacewings for aphid control' },
    { title: 'Regular Monitoring', description: 'Inspect crops weekly for early pest detection' },
];

export default function PestsPage() {
    return (
        <div className="min-h-screen bg-[#f4f1ea] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2d412d] mb-2">Pest Management</h1>
                    <p className="text-slate-600">Monitor pests and track treatment effectiveness</p>
                </div>

                {/* Active Pests Alert */}
                {activePests.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-5 mb-6 flex items-start gap-4">
                        <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-red-900 mb-1">Active Pest Threats Detected</h3>
                            <p className="text-sm text-red-800">
                                {activePests.length} pest{activePests.length > 1 ? 's' : ''} currently affecting your crops.
                                Immediate action recommended.
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                    {/* Active Pests */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-[#dce2d3]">
                        <h2 className="text-xl font-bold text-[#2d412d] mb-6">Active Pests</h2>

                        <div className="space-y-4">
                            {activePests.map((pest, i) => (
                                <div
                                    key={i}
                                    className={`p-5 rounded-2xl border-2 ${pest.severity === 'high'
                                            ? 'bg-red-50 border-red-200'
                                            : pest.severity === 'medium'
                                                ? 'bg-orange-50 border-orange-200'
                                                : 'bg-yellow-50 border-yellow-200'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Bug className={
                                                pest.severity === 'high' ? 'text-red-600' :
                                                    pest.severity === 'medium' ? 'text-orange-600' :
                                                        'text-yellow-600'
                                            } size={24} />
                                            <div>
                                                <h3 className="font-bold text-[#2d412d]">{pest.name}</h3>
                                                <p className="text-xs text-slate-600">Detected {pest.detected}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${pest.severity === 'high'
                                                ? 'bg-red-200 text-red-800'
                                                : pest.severity === 'medium'
                                                    ? 'bg-orange-200 text-orange-800'
                                                    : 'bg-yellow-200 text-yellow-800'
                                            }`}>
                                            {pest.severity.toUpperCase()}
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate-700 mb-3">{pest.description}</p>

                                    <div className="flex items-center gap-2 mb-3">
                                        <Sprout size={14} className="text-green-600" />
                                        <span className="text-xs text-slate-600">
                                            Affecting: {pest.affectedCrops.join(', ')}
                                        </span>
                                    </div>

                                    <button className="w-full bg-[#2d412d] hover:bg-[#3a5a40] text-white py-2 rounded-xl text-sm font-semibold transition-colors">
                                        View Treatment Options
                                    </button>
                                </div>
                            ))}

                            {activePests.length === 0 && (
                                <div className="text-center py-12">
                                    <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
                                    <p className="text-slate-600">No active pest threats detected</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Prevention Tips */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#dce2d3]">
                        <h2 className="text-xl font-bold text-[#2d412d] mb-6">Prevention Tips</h2>

                        <div className="space-y-4">
                            {preventionTips.map((tip, i) => (
                                <div key={i} className="p-4 bg-green-50 rounded-2xl border border-green-200">
                                    <h3 className="font-semibold text-green-900 mb-2 text-sm">{tip.title}</h3>
                                    <p className="text-xs text-green-800">{tip.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Treatment History */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#dce2d3]">
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="text-[#2d412d]" size={20} />
                        <h2 className="text-xl font-bold text-[#2d412d]">Treatment History</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-[#dce2d3]">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Pest</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Treatment Method</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Effectiveness</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {treatments.map((treatment, i) => (
                                    <tr key={i} className="border-b border-[#dce2d3] hover:bg-[#f4f1ea]">
                                        <td className="py-4 px-4 text-sm text-slate-700">{treatment.date}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-[#2d412d]">{treatment.pest}</td>
                                        <td className="py-4 px-4 text-sm text-slate-700">{treatment.method}</td>
                                        <td className="py-4 px-4">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${treatment.effectiveness === 'Effective'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {treatment.effectiveness}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${treatment.status === 'completed'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-orange-100 text-orange-800'
                                                }`}>
                                                {treatment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
