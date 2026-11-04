import { MONTH_THEMES } from '../data/islandCalendarData';
import { getLunarDate } from '../utils/lunarCalendar';
import { ArrowUpRight, Compass } from 'lucide-react';

interface YearOverviewProps {
  onSelectMonth: (monthIndex: number) => void;
}

export default function YearOverview({ onSelectMonth }: YearOverviewProps) {
  const year = 2027;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-sky-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-wider font-semibold text-sky-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Toàn Cảnh Niên Lịch 2027 · Năm Đinh Mùi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            12 Tháng Hành Trình Biển Đảo Quê Hương
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Mỗi tháng trong năm 2027 gắn liền với một quần đảo, hòn đảo tiền tiêu, nhà giàn thép hay cụm hải đăng thiêng liêng dọc theo 3.260 km bờ biển hình chữ S Việt Nam. Chọn một tháng bất kỳ để xem lịch chi tiết và khám phá!
          </p>
        </div>

        {/* Decorative subtle background ring */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-96 h-96 rounded-full border border-sky-500/20 pointer-events-none" />
      </div>

      {/* 12 Months Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MONTH_THEMES.map((theme, monthIdx) => {
          const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
          const firstDayOfWeek = new Date(year, monthIdx, 1).getDay();
          const startOffset = (firstDayOfWeek + 6) % 7; // Monday = 0

          // Generate mini calendar days array
          const miniDays = [];
          for (let i = 0; i < startOffset; i++) {
            miniDays.push(null);
          }
          for (let d = 1; d <= daysInMonth; d++) {
            const lunar = getLunarDate(year, monthIdx + 1, d);
            miniDays.push({
              solarDay: d,
              lunarDay: lunar.day,
              isTet: monthIdx === 1 && (d === 6 || d === 7 || d === 8), // Tet Dinh Mui
            });
          }

          return (
            <div
              key={theme.month}
              onClick={() => onSelectMonth(monthIdx)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 p-4 flex flex-col justify-between cursor-pointer group"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-700 text-white text-xs font-bold flex items-center justify-center">
                      {theme.month}
                    </span>
                    <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors text-sm">
                      {theme.monthName}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors" />
                </div>

                <div className="text-[11px] text-sky-800 font-semibold truncate mb-2">
                  📍 {theme.islandName}
                </div>

                {/* Mini Day of Week Header */}
                <div className="grid grid-cols-7 text-[10px] text-center font-bold text-slate-400 mb-1">
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span className="text-sky-600">T7</span>
                  <span className="text-rose-600">CN</span>
                </div>

                {/* Mini Calendar Matrix */}
                <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] tabular-nums">
                  {miniDays.map((item, idx) => {
                    if (!item) {
                      return <span key={idx} className="p-1"></span>;
                    }
                    return (
                      <span
                        key={idx}
                        className={`p-1 rounded font-medium transition-colors ${
                          item.isTet
                            ? 'bg-rose-100 text-rose-700 font-bold'
                            : (idx % 7 === 6)
                            ? 'text-rose-600'
                            : (idx % 7 === 5)
                            ? 'text-sky-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {item.solarDay}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quote Snippet */}
              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 italic line-clamp-1">
                "{theme.mottoQuote}"
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
