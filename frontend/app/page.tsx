import { getFieldDashboardData } from '@/lib/harvesta-data';
import DashboardClient from '@/components/DashboardClient'; 

export default async function Home() {
  // Use your seeded ID
  const DEMO_FIELD_ID = "697505a5713331ce249805e6"; 

  const data = await getFieldDashboardData(DEMO_FIELD_ID);

  if (!data) return <div className="text-white">Loading data...</div>;

  return (
    <main className="min-h-screen bg-neutral-950">
       <DashboardClient 
          user={data.user} 
          field={data.field} 
          stats={data.stats} 
          crops={data.crops} 
       />
    </main>
  );
}