'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface HarvestaAssistantPanelProps {
    fieldId: string;
}

export default function HarvestaAssistantPanel({ fieldId }: HarvestaAssistantPanelProps) {
    const [query, setQuery] = useState('');
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setChatOpen(true);
        const userMsg: ChatMessage = { role: 'user', content: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setIsTyping(true);

        try {
            const res = await fetch('/api/assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'answerQuestion',
                    input: { fieldId, question: userMsg.content }
                })
            });

            const data = await res.json();
            const assistantMsg: ChatMessage = {
                role: 'assistant',
                content: data.result || "Sorry, I couldn't get a response."
            };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to AI Assistant." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="bg-[#f4f1ea] p-1 rounded-[2rem] shadow-xl border border-white/50 pointer-events-auto w-full">
            <AnimatePresence>
                {chatOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white rounded-[1.8rem] mb-2 p-4 max-h-[300px] overflow-y-auto"
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={`mb-3 ${msg.role === 'assistant' ? 'bg-[#f4f1ea]' : 'bg-[#dce2d3] ml-auto'} p-3 rounded-2xl max-w-[90%] text-sm text-[#2d412d]`}>
                                <p>{msg.content}</p>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="text-xs text-slate-400 pl-2">AI is analyzing...</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-[#e8e4db] rounded-[1.8rem] p-2 flex items-center gap-2">
                <div className="p-3 bg-white rounded-full text-[#3a4f3a]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </div>
                <form onSubmit={handleSearch} className="flex-1">
                    <input
                        type="text"
                        placeholder="How can I help you?"
                        className="w-full bg-transparent outline-none text-[#2d412d] placeholder-slate-500 font-medium"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
                <button onClick={handleSearch} className="p-3 bg-[#c5e065] rounded-full hover:brightness-105 transition-all">
                    <Send size={18} className="text-[#2d412d]" />
                </button>
            </div>
        </div>
    );
}
