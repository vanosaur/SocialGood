import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail, Phone, Video } from 'lucide-react';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f1ea] via-[#e8e4db] to-[#dce2d3] p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#2d412d] mb-2">Help & Support</h1>
                    <p className="text-slate-600">Get answers to your questions and learn how to use Harvesta</p>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="text-white" size={32} />
                        </div>
                        <h3 className="font-bold text-blue-900 mb-2">Live Chat</h3>
                        <p className="text-sm text-blue-700 mb-4">Chat with our support team</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                            Start Chat
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="text-white" size={32} />
                        </div>
                        <h3 className="font-bold text-green-900 mb-2">Email Support</h3>
                        <p className="text-sm text-green-700 mb-4">support@harvesta.com</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                            Send Email
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Phone className="text-white" size={32} />
                        </div>
                        <h3 className="font-bold text-orange-900 mb-2">Phone Support</h3>
                        <p className="text-sm text-orange-700 mb-4">1-800-HARVESTA</p>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                            Call Now
                        </button>
                    </div>
                </div>

                {/* FAQs */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <HelpCircle className="text-[#2d412d]" size={24} />
                        <h2 className="text-2xl font-bold text-[#2d412d]">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'How do I get crop recommendations?',
                                a: 'Go to Fields & Crops page, enter your soil NPK values, temperature, humidity, pH, and rainfall. Our AI will suggest the top 3 crops for your conditions.',
                            },
                            {
                                q: 'How does the irrigation schedule work?',
                                a: 'Visit the Irrigation page to create custom watering schedules. Set the time, duration, and frequency. The system will alert you if rain is forecasted.',
                            },
                            {
                                q: 'Can I track fertilizer applications?',
                                a: 'Yes! Go to Inventory page to log all fertilizer applications. The system tracks total NPK applied and shows your nutrient balance over time.',
                            },
                            {
                                q: 'How do I log field observations?',
                                a: 'Use the Observations page to record daily crop health. Rate health 1-10, select growth stage, and add notes about what you see in the field.',
                            },
                            {
                                q: 'Is my data secure?',
                                a: 'Yes, all data is encrypted and stored securely in MongoDB Atlas. We never share your farm data with third parties.',
                            },
                        ].map((faq, i) => (
                            <div key={i} className="p-5 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border-2 border-slate-200">
                                <h3 className="font-bold text-[#2d412d] mb-2">{faq.q}</h3>
                                <p className="text-sm text-slate-700">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Book className="text-purple-600" size={24} />
                            <h3 className="font-bold text-purple-900">Documentation</h3>
                        </div>
                        <p className="text-sm text-purple-700 mb-4">
                            Comprehensive guides on using every feature of Harvesta
                        </p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                            View Docs
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Video className="text-cyan-600" size={24} />
                            <h3 className="font-bold text-cyan-900">Video Tutorials</h3>
                        </div>
                        <p className="text-sm text-cyan-700 mb-4">
                            Watch step-by-step video guides for all features
                        </p>
                        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                            Watch Videos
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
