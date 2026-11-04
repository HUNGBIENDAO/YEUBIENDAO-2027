import { useState } from 'react';
import { X, Printer } from 'lucide-react';
import { MONTH_THEMES_DATA } from '../data/calendarData2027';
import { getLunarDate } from '../utils/lunarCalendar';

interface PrintCalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
  activeYear: number;
  activeMonth: number;
}

export function PrintCalendarView({
  isOpen,
  onClose,
  activeYear,
  activeMonth,
}: PrintCalendarViewProps) {
  const [selectedMonth, setSelectedMonth] = useState(activeMonth);

  if (!isOpen) return null;

  const themeIdx = Math.max(1, Math.min(12, selectedMonth)) - 1;
  const theme = MONTH_THEMES_DATA[themeIdx] || MONTH_THEMES_DATA[0];

  const daysInMonth = new Date(activeYear, selectedMonth, 0).getDate();
  const firstDay = new Date(activeYear, selectedMonth - 1, 1).getDay();
  const startOffset = (firstDay + 6) % 7; // Monday = 0

  const calendarDays = [];
  for (let i = 0; i < startOffset; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const lunar = getLunarDate(activeYear, selectedMonth, d);
    calendarDays.push({
      day: d,
      lunarDay: lunar.day,
      lunarMonth: lunar.month,
      isWeekend: ((startOffset + d - 1) % 7 === 5) || ((startOffset + d - 1) % 7 === 6),
    });
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm no-print animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-sky-700" />
              <span>In Trang Lịch Biển Đảo Năm {activeYear}</span>
            </h2>
            <p className="text-xs text-slate-500">
              Trang lịch chuẩn khổ A4 / Lịch bàn phục vụ giảng dạy và học tập
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Month Selector */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-slate-700 whitespace-nowrap mr-2">
            Chọn tháng:
          </span>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedMonth === m
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tháng {m}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100/60 flex justify-center">
          <div className="printable-calendar-page bg-white w-full max-w-2xl rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-sky-900 pb-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                  ★ LỊCH BIỂN ĐẢO NĂM {activeYear} · KẾ HOẠCH L27
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  THÁNG {selectedMonth} / {activeYear}
                </h1>
                <div className="text-xs text-slate-600 font-medium">
                  Hải đảo: <strong>{theme.islandName}</strong> ({theme.province})
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-semibold text-sky-800">
                  {theme.coordinates}
                </div>
                <div className="text-[11px] text-slate-500 italic max-w-xs line-clamp-2 mt-0.5">
                  "{theme.mottoQuote}"
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-800 relative">
              <img
                src={theme.image}
                alt={theme.islandName}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-white font-medium">
                {theme.title}
              </div>
            </div>

            {/* Grid */}
            <div>
              <div className="grid grid-cols-7 text-center text-xs font-bold uppercase border-b border-slate-200 pb-2">
                <span className="text-slate-700">T2</span>
                <span className="text-slate-700">T3</span>
                <span className="text-slate-700">T4</span>
                <span className="text-slate-700">T5</span>
                <span className="text-slate-700">T6</span>
                <span className="text-sky-700">T7</span>
                <span className="text-rose-600">CN</span>
              </div>

              <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 text-center border-b border-slate-200">
                {calendarDays.map((item, idx) => {
                  if (!item) {
                    return <div key={idx} className="p-2 min-h-[50px] bg-slate-50/50"></div>;
                  }
                  return (
                    <div
                      key={idx}
                      className={`p-2 min-h-[50px] flex flex-col justify-between ${
                        item.isWeekend ? 'bg-sky-50/20' : 'bg-white'
                      }`}
                    >
                      <span className="text-sm font-bold tabular-nums text-slate-800">
                        {item.day}
                      </span>
                      <span className="text-[10px] tabular-nums text-slate-400">
                        {item.lunarDay === 1 ? `${item.lunarDay}/${item.lunarMonth}` : item.lunarDay}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-sky-50 rounded-xl text-xs text-sky-950 flex items-center justify-between">
              <div>
                <strong>Tổ KHXH THCS Hồ Nghinh (Đà Nẵng):</strong> Tự hào Hoàng Sa - Trường Sa
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                lich-bien-dao-2027
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            * Mẹo: Chọn khổ giấy A4 trong cài đặt máy in.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl"
            >
              Hủy
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-xl shadow-xs flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>In trang lịch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
