'use client';

import React from 'react';
import {
    LayoutGrid, Sprout, Droplets, CloudRain, Bug, Package, FileText, HelpCircle
} from 'lucide-react';

interface NavItemProps {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}

function NavItem({ label, icon, active, onClick }: NavItemProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-[#dce2d3] font-bold shadow-sm' : 'text-slate-500 hover:bg-[#e8e4db]'}`}
        >
            <span className={active ? 'text-[#2d412d] scale-110' : ''}>{icon}</span>
            <span>{label}</span>
        </button>
    );
}

export default function TopNav() {
    // In a real app, 'active' state would come from the router or props
    return (
        <nav className="flex-1 space-y-2">
            <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active />
            <NavItem icon={<Sprout size={20} />} label="Fields" />
            <NavItem icon={<Droplets size={20} />} label="Irrigation" />
            <NavItem icon={<CloudRain size={20} />} label="Climate" />
            <NavItem icon={<Bug size={20} />} label="Pests" />
            <NavItem icon={<Package size={20} />} label="Inventory" />
            <NavItem icon={<FileText size={20} />} label="Reports" />
            <NavItem icon={<HelpCircle size={20} />} label="Help" />
        </nav>
    );
}
