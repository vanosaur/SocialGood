import React from 'react';
import { User } from '@/types/harvesta';

interface UserBadgeProps {
    user: User;
}

export default function UserBadge({ user }: UserBadgeProps) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img src={user.avatarUrl} alt={user.name} />
            </div>
            <div>
                <p className="text-sm font-bold text-[#2d412d]">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
            </div>
        </div>
    );
}
