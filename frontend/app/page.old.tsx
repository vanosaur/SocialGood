import Link from 'next/link';
import { ArrowUpRight, Droplets, Thermometer, Wind, Sprout } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">

      {/* Top Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#344e41]">Welcome back, Alex!</h1>
          <p className="text-[#3a5a40]/80 mt-1">Here's what's happening in your fields today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/recommend" className="bg-[#a3b18a] hover:bg-[#344e41] text-[#344e41] hover:text-white px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            New Recommendation
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Planted Area"
          value="125 ha"
          icon={<Sprout className="w-6 h-6 text-[#344e41]" />}
          bg="bg-[#dad7cd]"
        />
        <StatCard
          label="Current NDVI"
          value="0.62"
          icon={<ArrowUpRight className="w-6 h-6 text-[#344e41]" />}
          bg="bg-[#e9edc9]"
        />
        <StatCard
          label="Humidity"
          value="19%"
          icon={<Droplets className="w-6 h-6 text-[#344e41]" />}
          bg="bg-[#faedcd]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Field Visual (Placeholder for map/visual) */}
        <div className="lg:col-span-2 bg-[#3a5a40] rounded-3xl p-8 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-between group">
          {/* Background Image Effect */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Field 01</h2>
              <p className="opacity-80">42°34' N, 88°21' W</p>
            </div>
            <span className="bg-[#ffb703] text-[#344e41] px-3 py-1 rounded-full text-sm font-bold">Optimal Zone</span>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="glass-panel p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="flex gap-8">
                <div>
                  <p className="text-sm opacity-70">Soil Moisture</p>
                  <p className="text-2xl font-bold">64%</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Predicted Yield</p>
                  <p className="text-2xl font-bold">High</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#344e41]/5">
            <h3 className="font-bold text-[#344e41] mb-4">Quick Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#fefae0]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ffb703]/20 flex items-center justify-center text-[#ffb703]">N</div>
                  <span className="font-medium">Nitrogen</span>
                </div>
                <span className="font-bold">48/100</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#fefae0]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3a5a40]/20 flex items-center justify-center text-[#3a5a40]">P</div>
                  <span className="font-medium">Phosphorus</span>
                </div>
                <span className="font-bold">40/100</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#fefae0]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#a3b18a]/20 flex items-center justify-center text-[#a3b18a]">K</div>
                  <span className="font-medium">Potassium</span>
                </div>
                <span className="font-bold">55/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function StatCard({ label, value, icon, bg }: { label: string, value: string, icon: React.ReactNode, bg: string }) {
  return (
    <div className={`p-6 rounded-3xl ${bg} flex items-center justify-between`}>
      <div>
        <p className="text-[#344e41]/70 text-sm font-medium mb-1">{label}</p>
        <p className="text-4xl font-bold text-[#344e41]">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
        {icon}
      </div>
    </div>
  )
}