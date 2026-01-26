import Link from 'next/link';
import { LayoutDashboard, Sprout, Droplets, CloudRain, Bug, Package, FileText, HelpCircle, Search, Bell, Settings, Eye } from 'lucide-react';
import React from 'react';

import './globals.css';

import { getCurrentUser } from '@/lib/harvesta-data';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className="flex h-screen bg-[#f4f1ea] text-[#2d412d] font-sans overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 flex flex-col p-6 border-r border-[#dce2d3] bg-[#f4f1ea] z-50">
          <div className="mb-10 flex items-center gap-3">
            <div className="bg-[#2d412d] text-white p-2 rounded-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Harvesta</span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem href="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem href="/recommend" icon={<Sprout size={20} />} label="Fields & Crops" />
            <NavItem href="/irrigation" icon={<Droplets size={20} />} label="Irrigation" />
            <NavItem href="/climate" icon={<CloudRain size={20} />} label="Climate" />
            <NavItem href="/pests" icon={<Bug size={20} />} label="Pests" />
            <NavItem href="/observations" icon={<Eye size={20} />} label="Observations" />
            <NavItem href="/inventory" icon={<Package size={20} />} label="Inventory" />
            <NavItem href="/reports" icon={<FileText size={20} />} label="Reports" />
            <NavItem href="/help" icon={<HelpCircle size={20} />} label="Help" />
          </nav>

          <div className="mt-auto pt-6 border-t border-[#dce2d3]">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img src={user.avatarUrl} alt={user.name} />
              </div>
              <div>
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto relative">
          {/* Header is handled individually by pages or could be global here */}
          {/* For Harvesta design, the header is floating, so we let pages render their own specialized headers, or we render a transparent placeholder here if needed. */}
          {/* Actually, the previous layout had a global header. The new design has a floating header specific to the map view. We will leave the header OUT of the global layout for maximum flexibility, or make it minimal. */}
          {/* Let's render children directly to allow full screen maps. */}
          {children}
        </main>
      </body>
    </html>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-slate-500 hover:bg-[#e8e4db] hover:text-[#2d412d]"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
