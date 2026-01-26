import React from 'react';
import { getFieldDashboardData } from '@/lib/harvesta-data';
import FieldHeader from '@/components/harvesta/FieldHeader';
import FieldStats from '@/components/harvesta/FieldStats';
import CropList from '@/components/harvesta/CropList';
import NpkCard from '@/components/harvesta/NpkCard';
import LeafAreaIndexCard from '@/components/harvesta/LeafAreaIndexCard';
import HarvestaAssistantPanel from '@/components/harvesta/HarvestaAssistantPanel';
import ClientMap from '@/components/ClientMap';

interface PageProps {
    params: Promise<{
        fieldId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { fieldId } = await params;
    const data = await getFieldDashboardData(fieldId);

    return (
        <div className="flex h-screen w-full bg-[#f4f1ea] text-[#2d412d] font-sans overflow-hidden">

            {/* SIDEBAR */}
            {/* Sidebar is handled by Global Layout */}

            {/* MAIN CONTENT */}
            <main className="flex-1 relative flex flex-col">

                {/* Floating Header */}
                <FieldHeader field={data.field} />

                <div className="absolute inset-0 z-0">
                    <ClientMap />
                </div>

                {/* Dashboard Widgets Layer */}
                <div className="relative z-10 flex-1 p-8 pointer-events-none flex flex-col justify-center">

                    {/* Top Stats */}
                    <div className="mt-20">
                        <FieldStats field={data.field} />
                    </div>

                    {/* Middle Row: Crop List */}
                    <div className="mb-auto">
                        <CropList crops={data.crops} field={data.field} />
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-3 gap-6 pointer-events-auto items-end">
                        <NpkCard npk={data.npk} />
                        <LeafAreaIndexCard data={data.leafAreaIndex} />
                        <HarvestaAssistantPanel fieldId={fieldId} />
                    </div>

                </div>

            </main>
        </div>
    );
}
