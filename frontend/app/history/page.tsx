'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Calendar, MapPin, ChevronRight, Loader2 } from 'lucide-react';

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get('/api/history');
                setHistory(res.data);
            } catch (error) {
                console.error("Failed to fetch history", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#a3b18a] rounded-xl flex items-center justify-center text-[#344e41]">
                    <History className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-[#344e41]">Recommendation History</h1>
                    <p className="text-[#3a5a40]/70">Review your past crop analysis and results.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-[#344e41]/5 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center text-[#344e41]">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : history.length === 0 ? (
                    <div className="p-12 text-center text-[#344e41]/60">
                        <p>No history found. Try getting a recommendation first!</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-[#fefae0] text-[#344e41] font-bold">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Recommended Crop</th>
                                <th className="px-6 py-4">Confidence</th>
                                <th className="px-6 py-4">Feedback</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dad7cd]/20">
                            {history.map((item) => (
                                <tr key={item.id} className="hover:bg-[#f9f9f9] transition-colors group">
                                    <td className="px-6 py-4 text-[#344e41]/80">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 opacity-50" />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-[#344e41]">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 opacity-50" />
                                            {item.location || "Unknown"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize font-bold text-[#344e41] text-lg">{item.result.recommended_crop}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* Assuming top_predictions is stored, grabbing first one's probability */}
                                        {item.result.top_predictions?.[0] ? (
                                            <span className="inline-block bg-[#e9edc9] text-[#344e41] px-2 py-1 rounded text-sm font-bold">
                                                {(item.result.top_predictions[0].probability * 100).toFixed(1)}%
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.feedback ? (
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${item.feedback.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {item.feedback.success ? 'Success' : 'Failed'}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">No feedback</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-[#344e41]/10 rounded-full transition-colors text-[#344e41]">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
