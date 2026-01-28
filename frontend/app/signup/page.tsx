'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await axios.post('/api/register', { name, email, password });
            // Redirect to login on success
            router.push('/login?registered=true');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f1ea] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-[#dce2d3]">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-[#2d412d] rounded-xl flex items-center justify-center text-white mb-4">
                        <Sprout size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-[#2d412d]">Join Harvesta</h1>
                    <p className="text-slate-500">Create your account to start farming smarter</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#2d412d] mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Alex Jackson"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[#f4f1ea] border border-[#dce2d3] focus:ring-2 focus:ring-[#2d412d] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2d412d] mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="farmer@harvesta.com"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[#f4f1ea] border border-[#dce2d3] focus:ring-2 focus:ring-[#2d412d] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2d412d] mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-xl bg-[#f4f1ea] border border-[#dce2d3] focus:ring-2 focus:ring-[#2d412d] focus:outline-none"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2d412d] text-white py-3 rounded-xl font-bold hover:bg-[#1a261a] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#2d412d] font-bold hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
