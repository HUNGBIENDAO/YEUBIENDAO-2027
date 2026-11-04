import { useState } from 'react';
import { MONTH_THEMES_DATA } from '../data/calendarData2027';
import { getLunarDate } from '../utils/lunarCalendar';
import { Language, TRANSLATIONS } from '../utils/translations';
import { ArrowUpRight, Compass, Calendar } from 'lucide-react';

interface YearViewProps {
  onSelectMonth: (year: number, month: number) => void;
  onSelectDate: (year: number, month: number, day: number) => void;
  language: Language;
}

export function YearView({ onSelectMonth, onSelectDate, language }: YearViewProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2027);
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-sky-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-sky-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Toàn Cảnh Niên Lịch Biển Đảo Quê Hương</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            12 Tháng Hành Trình Năm {selectedYear}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Chọn một tháng hoặc một ngày bất kỳ để xem chi tiết lịch âm, dấu mốc lịch sử hải đảo và ghi chú kế hoạch dạy học, hoạt động Đội.
          </p>
        </div>

        {/* Year toggle (2026 / 2027) */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedYear(2026)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              selectedYear === 2026 ? 'bg-white text-sky-950 shadow-sm' : 'text-sky-200 hover:text-white'
            }`}
          >
            Năm 2026
          </button>
          <button
            type="button"
            onClick={() => setSelectedYear(2027)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              selectedYear === 2027 ? 'bg-white text-sky-950 shadow-sm' : 'text-sky-200 hover:text-white'
            }`}
          >
            Năm 2027 (Trọng tâm L27)
          </button>
        </div>
      </div>

      {/* 12 Months Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MONTH_THEMES_DATA.map((theme, idx) => {
          const monthNum = idx + 1;
          const daysInMonth = new Date(selectedYear, monthNum, 0).getDate();
          const firstDayOfWeek = new Date(selectedYear, monthNum - 1, 1).getDay();
          const startOffset = (firstDayOfWeek + 6) % 7; // Monday = 0

          const miniDays = [];
          for (let i = 0; i < startOffset; i++) {
            miniDays.push(null);
          }
          for (let d = 1; d <= daysInMonth; d++) {
            const lunar = getLunarDate(selectedYear, monthNum, d);
            const isTet = selectedYear === 2027 && monthNum === 2 && (d >= 6 && d <= 8);
            miniDays.push({
              day: d,
              lunarDay: lunar.day,
              isTet,
            });
          }

          return (
            <div
              key={theme.month}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 p-4 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <button
                    onClick={() => onSelectMonth(selectedYear, monthNum)}
                    className="flex items-center gap-2 text-left"
                  >
                    <span className="w-6 h-6 rounded-lg bg-sky-700 text-white text-xs font-bold flex items-center justify-center">
                      {monthNum}
                    </span>
                    <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors text-sm">
                      {t.monthLabel} {monthNum}
                    </h3>
                  </button>
                  <ArrowUpRight
                    onClick={() => onSelectMonth(selectedYear, monthNum)}
                    className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors cursor-pointer"
                  />
                </div>

                <div className="text-[11px] text-sky-800 font-semibold truncate mb-2">
                  📍 {theme.islandName}
                </div>

                {/* Day of Week */}
                <div className="grid grid-cols-7 text-[10px] text-center font-bold text-slate-400 mb-1">
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span className="text-sky-600">T7</span>
                  <span className="text-rose-600">CN</span>
                </div>

                {/* Matrix */}
                <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] tabular-nums">
                  {miniDays.map((item, dIdx) => {
                    if (!item) {
                      return <span key={dIdx} className="p-1"></span>;
                    }
                    return (
                      <button
                        key={dIdx}
                        type="button"
                        onClick={() => onSelectDate(selectedYear, monthNum, item.day)}
                        className={`p-1 rounded font-medium hover:bg-sky-100 transition-colors cursor-pointer ${
                          item.isTet
                            ? 'bg-rose-100 text-rose-700 font-bold'
                            : (dIdx % 7 === 6)
                            ? 'text-rose-600'
                            : (dIdx % 7 === 5)
                            ? 'text-sky-600'
                            : 'text-slate-700'
                        }`}
                        title={`Xem ngày ${item.day}/${monthNum}/${selectedYear}`}
                      >
                        {item.day}
                      </button>
                    );
                  })}
                </div>
              </div>

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
