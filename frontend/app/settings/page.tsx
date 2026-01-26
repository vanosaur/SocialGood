'use client';

import { Settings, User, Bell, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#a3b18a] rounded-xl flex items-center justify-center text-[#344e41]">
                    <Settings className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-[#344e41]">Settings</h1>
                    <p className="text-[#3a5a40]/70">Manage your profile and preferences.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#344e41]/5">
                    <h2 className="text-xl font-bold text-[#344e41] mb-6 flex items-center gap-2">
                        <User className="w-5 h-5" /> Profile
                    </h2>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-[#344e41] text-white flex items-center justify-center text-2xl font-bold">
                            AJ
                        </div>
                        <div>
                            <button className="bg-[#344e41] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#2c4236] transition-colors">
                                Change Photo
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#344e41] mb-2">Full Name</label>
                            <input type="text" defaultValue="Alex Jackson" className="w-full px-4 py-3 rounded-xl bg-[#fefae0]/30 border border-[#344e41]/10 focus:ring-2 focus:ring-[#3a5a40] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#344e41] mb-2">Email</label>
                            <input type="email" defaultValue="alex@harvesta.com" className="w-full px-4 py-3 rounded-xl bg-[#fefae0]/30 border border-[#344e41]/10 focus:ring-2 focus:ring-[#3a5a40] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#344e41] mb-2">Role</label>
                            <select className="w-full px-4 py-3 rounded-xl bg-[#fefae0]/30 border border-[#344e41]/10 focus:ring-2 focus:ring-[#3a5a40] focus:outline-none text-[#344e41]">
                                <option>Farmer</option>
                                <option>Agronomist</option>
                                <option>Researcher</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#344e41]/5">
                    <h2 className="text-xl font-bold text-[#344e41] mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5" /> Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 hover:bg-[#f9f9f9] rounded-xl transition-colors">
                            <div>
                                <p className="font-bold text-[#344e41]">Weather Alerts</p>
                                <p className="text-sm text-[#344e41]/60">Get notified about heavy rain or drought.</p>
                            </div>
                            <Toggle active />
                        </div>
                        <div className="flex items-center justify-between p-3 hover:bg-[#f9f9f9] rounded-xl transition-colors">
                            <div>
                                <p className="font-bold text-[#344e41]">Irrigation Reminders</p>
                                <p className="text-sm text-[#344e41]/60">Daily reminders to water your growing crops.</p>
                            </div>
                            <Toggle active />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-3 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5" /> Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

function Toggle({ active }: { active?: boolean }) {
    return (
        <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${active ? 'bg-[#344e41]' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-6' : ''}`}></div>
        </div>
    )
}
