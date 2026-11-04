import { useState } from 'react';
import { MAP_ISLAND_LOCATIONS } from '../data/islandCalendarData';
import { IslandLocation } from '../types/calendar';
import { MapPin, Compass, Navigation, ArrowRight, Info, ShieldCheck } from 'lucide-react';

interface IslandMapExplorerProps {
  onJumpToMonth: (monthIndex: number) => void;
}

export default function IslandMapExplorer({ onJumpToMonth }: IslandMapExplorerProps) {
  const [selectedIsland, setSelectedIsland] = useState<IslandLocation>(
    MAP_ISLAND_LOCATIONS.find((i) => i.id === 'truong-sa') || MAP_ISLAND_LOCATIONS[0]
  );
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const filteredIslands =
    regionFilter === 'all'
      ? MAP_ISLAND_LOCATIONS
      : MAP_ISLAND_LOCATIONS.filter((i) => i.region === regionFilter);

  const regions = [
    { id: 'all', name: 'Tất cả (15 Điểm đảo & Nhà giàn)' },
    { id: 'Bắc Bộ', name: 'Bắc Bộ' },
    { id: 'Bắc Trung Bộ', name: 'Bắc Trung Bộ' },
    { id: 'Nam Trung Bộ', name: 'Nam Trung Bộ (Hoàng Sa - Trường Sa)' },
    { id: 'Đông Nam Bộ', name: 'Đông Nam Bộ & DK1' },
    { id: 'Tây Nam', name: 'Vùng biển Tây Nam' },
  ];

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-sky-700 flex items-center gap-1.5 mb-1">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>Hải Trình Tổ Quốc Trên Biển Đông</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Bản Đồ Tương Tác Hải Đảo & Thềm Lục Địa Việt Nam
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Khám phá các tọa độ hải đảo tiền tiêu, quần đảo Hoàng Sa, Trường Sa và các cụm nhà giàn DK1 bảo vệ chủ quyền thiêng liêng trên Biển Đông.
          </p>
        </div>

        {/* Region filter buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setRegionFilter(reg.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                regionFilter === reg.id
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {reg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Detail Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Stylized Maritime Map (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-gradient-to-b from-sky-950 via-slate-900 to-sky-950 rounded-3xl p-4 sm:p-6 text-white relative overflow-hidden border border-slate-800 shadow-md flex flex-col">
          {/* Map Compass Rose / Sea labels */}
          <div className="flex items-center justify-between text-xs text-sky-300 font-medium mb-3 border-b border-sky-800/40 pb-2">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400 rotate-45" />
              <span className="tracking-wider uppercase font-bold">Biển Đông Việt Nam (South China Sea)</span>
            </div>
            <div className="text-[11px] text-sky-400">
              Kinh độ 102°Đ - 117°Đ · Vĩ độ 6°B - 22°B
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] max-h-[620px] bg-sky-950/60 rounded-2xl border border-sky-900/50 p-2 overflow-hidden flex items-center justify-center">
            {/* Sea depth subtle contours & grid */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
            >
              {/* Latitude / Longitude Subtle Lines */}
              <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="1 1" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="1 1" />
              <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="1 1" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="1 1" />
              <line x1="30" y1="0" x2="30" y2="100" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="1 1" />
              <line x1="60" y1="0" x2="60" y2="100" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="1 1" />
              <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="1 1" />

              {/* Stylized Vietnam Mainland Coastline Ribbon */}
              <path
                d="M 40,5
                   C 42,6 48,7 52,9
                   C 56,11 58,13 54,15
                   C 50,17 46,18 45,21
                   C 44,24 45,28 47,32
                   C 49,36 52,38 55,42
                   C 57,45 59,48 57,52
                   C 55,56 56,60 58,64
                   C 60,68 62,72 58,76
                   C 54,80 48,82 42,85
                   C 36,88 32,92 34,95
                   C 32,94 28,92 26,88
                   C 24,84 26,80 30,78
                   C 35,76 38,72 37,68
                   C 36,64 35,58 36,52
                   C 37,46 36,40 35,34
                   C 34,28 32,22 34,16
                   C 36,10 38,6 40,5 Z"
                fill="#0f2b38"
                stroke="#0284c7"
                strokeWidth="0.8"
                opacity="0.85"
              />

              {/* Water Labels */}
              <text x="56" y="22" fill="#38bdf8" opacity="0.45" fontSize="2.5" fontWeight="bold">
                VỊNH BẮC BỘ
              </text>
              <text x="68" y="58" fill="#38bdf8" opacity="0.45" fontSize="3" fontWeight="bold">
                BIỂN ĐÔNG
              </text>
              <text x="18" y="76" fill="#38bdf8" opacity="0.45" fontSize="2.2" fontWeight="bold">
                VỊNH THÁI LAN
              </text>

              {/* Archipelago zone outlines */}
              {/* Hoang Sa bounding circle */}
              <ellipse cx="74" cy="40" rx="7" ry="5" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.6" />
              <text x="67" y="34" fill="#fbbf24" fontSize="2.2" fontWeight="bold">
                QĐ. HOÀNG SA
              </text>

              {/* Truong Sa bounding circle */}
              <ellipse cx="80" cy="84" rx="10" ry="7" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.6" />
              <text x="73" y="76" fill="#fbbf24" fontSize="2.2" fontWeight="bold">
                QĐ. TRƯỜNG SA
              </text>

              {/* DK1 zone */}
              <ellipse cx="68" cy="92" rx="5" ry="3.5" fill="none" stroke="#38bdf8" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.5" />
              <text x="63" y="89" fill="#38bdf8" fontSize="1.8" fontWeight="bold">
                CỤM DK1
              </text>

              {/* Island Interactive Markers */}
              {filteredIslands.map((island) => {
                const isSelected = selectedIsland.id === island.id;
                const isSpecial = island.id === 'hoang-sa' || island.id === 'truong-sa' || island.id === 'dk1';

                return (
                  <g
                    key={island.id}
                    onClick={() => setSelectedIsland(island)}
                    className="cursor-pointer group/pin"
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={island.coords.x}
                        cy={island.coords.y}
                        r="3.5"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="0.6"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer marker halo */}
                    <circle
                      cx={island.coords.x}
                      cy={island.coords.y}
                      r={isSelected ? 2.5 : 1.8}
                      fill={isSelected ? '#e11d48' : isSpecial ? '#f59e0b' : '#38bdf8'}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                    />

                    {/* Small inner point */}
                    <circle
                      cx={island.coords.x}
                      cy={island.coords.y}
                      r="0.8"
                      fill="#ffffff"
                    />

                    {/* Label */}
                    <text
                      x={island.coords.x + 2.5}
                      y={island.coords.y + 0.8}
                      fill={isSelected ? '#ffffff' : '#e0f2fe'}
                      fontSize={isSelected ? '2.4' : '2'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
                    >
                      {island.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 text-[11px] text-sky-300 flex items-center justify-between">
            <span>* Bấm vào điểm đảo trên bản đồ để xem thông tin chi tiết.</span>
            <span className="text-amber-300">● Màu vàng: Quần đảo đặc biệt / DK1</span>
          </div>
        </div>

        {/* Selected Island Detail Drawer (4 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-sky-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedIsland.region}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedIsland.name}
                </h2>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  {selectedIsland.archipelago}
                </div>
              </div>

              <span className="px-2.5 py-1 text-xs font-bold text-sky-800 bg-sky-100 rounded-lg">
                Tháng {selectedIsland.featuredMonth}
              </span>
            </div>

            {/* Coordinates Badge */}
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono">
              <Compass className="w-4 h-4 text-sky-700 shrink-0" />
              <span>Tọa độ: {selectedIsland.latLngStr}</span>
            </div>

            {/* Significance & Sovereignty */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ý nghĩa Chủ quyền & Chiến lược</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedIsland.significance}
              </p>
            </div>

            {/* Fun Fact for Teen */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                <span>Bạn có biết? (Teen Fun Fact)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/70 p-3 rounded-xl border border-amber-100/70">
                {selectedIsland.funFact}
              </p>
            </div>
          </div>

          {/* Jump to Month Calendar CTA */}
          <div className="pt-2">
            <button
              onClick={() => onJumpToMonth(selectedIsland.featuredMonth - 1)}
              className="w-full py-3 px-4 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Xem Lịch & Câu Chuyện Tháng {selectedIsland.featuredMonth}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
