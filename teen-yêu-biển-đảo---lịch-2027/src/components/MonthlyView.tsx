import { useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Calendar as CalendarIcon,
  Sparkles,
  BookOpen,
  Leaf,
  Clock,
  CheckCircle,
  GraduationCap,
  Mail,
} from 'lucide-react';
import { MONTH_THEMES_DATA } from '../data/calendarData2027';
import { getLunarDate, isHoangDaoDay } from '../utils/lunarCalendar';
import { CalendarDay, UserNote, Language } from '../types/calendar';
import { FIXED_DAY_EVENTS_2027 } from '../data/calendarData2027';
import { TRANSLATIONS } from '../utils/translations';

interface MonthlyViewProps {
  currentYear: number;
  currentMonth: number; // 1-12
  onMonthChange: (year: number, month: number) => void;
  onSelectDay: (day: CalendarDay) => void;
  userNotes: Record<string, UserNote[]>;
  onOpenLetterModal: () => void;
  language: Language;
}

export function MonthlyView({
  currentYear,
  currentMonth,
  onMonthChange,
  onSelectDay,
  userNotes,
  onOpenLetterModal,
  language,
}: MonthlyViewProps) {
  const t = TRANSLATIONS[language];

  // Pick theme for current month (1-12)
  const currentTheme = useMemo(() => {
    const idx = Math.max(1, Math.min(12, currentMonth));
    return MONTH_THEMES_DATA[idx - 1] || MONTH_THEMES_DATA[0];
  }, [currentMonth]);

  // Calendar cells generation for (currentYear, currentMonth)
  const calendarCells = useMemo(() => {
    const cells: CalendarDay[] = [];
    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 is Sunday, 1 is Monday...

    // Monday-first offset
    const startOffset = (firstDayOfWeek + 6) % 7;

    // Previous month padding
    const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    for (let i = startOffset - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const dateObj = new Date(prevYear, prevMonth - 1, d);
      const lunar = getLunarDate(prevYear, prevMonth, d);
      const dateKey = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const fixedEvents = FIXED_DAY_EVENTS_2027[dateKey] || [];
      const notes = userNotes[dateKey] || [];
      const customEvents = notes.map((n) => ({
        id: n.id,
        title: n.title,
        category: 'user' as const,
        description: n.content,
      }));

      cells.push({
        date: dateObj,
        solarDay: d,
        solarMonth: prevMonth,
        solarYear: prevYear,
        dayOfWeek: dateObj.getDay(),
        lunar,
        isCurrentMonth: false,
        isToday: false,
        events: [...fixedEvents, ...customEvents],
        hoangDao: isHoangDaoDay(prevYear, prevMonth, d),
      });
    }

    // Current month days
    const now = new Date();
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth - 1, d);
      const lunar = getLunarDate(currentYear, currentMonth, d);
      const dateKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const fixedEvents = FIXED_DAY_EVENTS_2027[dateKey] || [];
      const notes = userNotes[dateKey] || [];
      const customEvents = notes.map((n) => ({
        id: n.id,
        title: n.title,
        category: 'user' as const,
        description: n.content,
      }));

      const isToday =
        now.getFullYear() === currentYear &&
        now.getMonth() === currentMonth - 1 &&
        now.getDate() === d;

      cells.push({
        date: dateObj,
        solarDay: d,
        solarMonth: currentMonth,
        solarYear: currentYear,
        dayOfWeek: dateObj.getDay(),
        lunar,
        isCurrentMonth: true,
        isToday,
        events: [...fixedEvents, ...customEvents],
        hoangDao: isHoangDaoDay(currentYear, currentMonth, d),
      });
    }

    // Next month padding to complete row
    const remainder = (7 - (cells.length % 7)) % 7;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

    for (let d = 1; d <= remainder; d++) {
      const dateObj = new Date(nextYear, nextMonth - 1, d);
      const lunar = getLunarDate(nextYear, nextMonth, d);
      const dateKey = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const fixedEvents = FIXED_DAY_EVENTS_2027[dateKey] || [];
      const notes = userNotes[dateKey] || [];
      const customEvents = notes.map((n) => ({
        id: n.id,
        title: n.title,
        category: 'user' as const,
        description: n.content,
      }));

      cells.push({
        date: dateObj,
        solarDay: d,
        solarMonth: nextMonth,
        solarYear: nextYear,
        dayOfWeek: dateObj.getDay(),
        lunar,
        isCurrentMonth: false,
        isToday: false,
        events: [...fixedEvents, ...customEvents],
        hoangDao: isHoangDaoDay(nextYear, nextMonth, d),
      });
    }

    return cells;
  }, [currentYear, currentMonth, userNotes]);

  const handlePrev = () => {
    if (currentMonth === 1) {
      onMonthChange(currentYear - 1, 12);
    } else {
      onMonthChange(currentYear, currentMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 12) {
      onMonthChange(currentYear + 1, 1);
    } else {
      onMonthChange(currentYear, currentMonth + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title={t.previousMonth}
              aria-label={t.previousMonth}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title={t.nextMonth}
              aria-label={t.nextMonth}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{t.monthLabel} {currentMonth}</span>
              <span className="text-sky-700 font-extrabold">{currentYear}</span>
            </h1>
            <div className="text-xs text-slate-500 font-medium">
              {t.lunarYear} · Điểm đảo: <strong className="text-sky-900">{currentTheme.islandName}</strong> ({currentTheme.province})
            </div>
          </div>
        </div>

        {/* Quick Month Selector Tabs & Letter CTA */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <button
                key={m}
                onClick={() => onMonthChange(currentYear, m)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  currentMonth === m
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                T.{m}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenLetterModal}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Gửi thư ra đảo</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Spotlight Card for the Month */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Visual Zone (Left 7 Cols) */}
        <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] bg-slate-900 overflow-hidden group">
          <img
            src={currentTheme.image}
            alt={currentTheme.islandName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

          {/* Overlay info */}
          <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-200 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {currentTheme.province}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-sky-300" />
                {currentTheme.coordinates}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {currentTheme.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 italic line-clamp-2 max-w-xl">
              "{currentTheme.mottoQuote}"
            </p>
          </div>
        </div>

        {/* Narrative & School Prompt Zone (Right 5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50 space-y-4">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Câu chuyện Hải đảo Tháng {currentTheme.month}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentTheme.story}
              </p>
            </div>

            {/* Biodiversity Highlight */}
            <div className="space-y-2 pt-2 border-t border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hệ sinh thái & Thiên nhiên kỳ thú</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {currentTheme.biodiversity.map((bio, i) => (
                  <div key={i} className="text-xs bg-emerald-50/70 rounded-xl p-2 border border-emerald-100/80">
                    <span className="font-semibold text-emerald-950 block">{bio.name}</span>
                    <span className="text-emerald-800 text-[11px] leading-tight block mt-0.5">
                      {bio.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Milestone */}
            <div className="pt-2 border-t border-slate-200/70">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Dấu ấn lịch sử: {currentTheme.historicalHighlight.year}</span>
              </div>
              <p className="text-xs text-slate-600 italic">
                {currentTheme.historicalHighlight.event}
              </p>
            </div>
          </div>

          {/* Teaching integration for secondary schools */}
          <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200/80 flex items-start gap-3 mt-1">
            <div className="p-2 rounded-xl bg-amber-600 text-white shrink-0 mt-0.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Gợi ý Dạy học Liên môn & GD Địa phương
              </div>
              <div className="text-xs text-amber-900 mt-0.5 leading-snug">
                {currentTheme.teachingPrompt}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calendar Grid Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-bold uppercase tracking-wider py-3">
          <div className="text-slate-700">T.Hai</div>
          <div className="text-slate-700">T.Ba</div>
          <div className="text-slate-700">T.Tư</div>
          <div className="text-slate-700">T.Năm</div>
          <div className="text-slate-700">T.Sáu</div>
          <div className="text-sky-700">T.Bảy</div>
          <div className="text-rose-700">Chủ Nhật</div>
        </div>

        {/* Matrix Days */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {calendarCells.map((day, idx) => {
            const isSunday = day.dayOfWeek === 0;
            const isSaturday = day.dayOfWeek === 6;
            const hasUserNotes = day.events.some((e) => e.category === 'user');

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectDay(day)}
                className={`relative min-h-[96px] sm:min-h-[110px] p-2 text-left flex flex-col justify-between transition-colors group cursor-pointer focus:outline-none focus:bg-sky-50/50 ${
                  day.isCurrentMonth
                    ? 'bg-white hover:bg-sky-50/40'
                    : 'bg-slate-50/50 hover:bg-slate-100/60 opacity-40'
                } ${day.isToday ? 'ring-2 ring-inset ring-sky-600 bg-sky-50/30' : ''}`}
              >
                {/* Top Row: Solar Day + Lunar Day */}
                <div className="flex items-start justify-between">
                  <span
                    className={`text-base sm:text-lg font-bold tabular-nums tracking-tight ${
                      !day.isCurrentMonth
                        ? 'text-slate-400'
                        : isSunday
                        ? 'text-rose-600'
                        : isSaturday
                        ? 'text-sky-700'
                        : 'text-slate-800'
                    }`}
                  >
                    {day.solarDay}
                  </span>

                  {/* Lunar Day Display */}
                  <span
                    className={`text-[10px] sm:text-xs tabular-nums font-medium ${
                      day.lunar.day === 1 || day.lunar.day === 15
                        ? 'font-bold text-rose-700 bg-rose-50 px-1 py-0.5 rounded'
                        : 'text-slate-400'
                    }`}
                    title={`Âm lịch: ${day.lunar.day}/${day.lunar.month}`}
                  >
                    {day.lunar.day === 1
                      ? `${day.lunar.day}/${day.lunar.month}`
                      : day.lunar.day}
                  </span>
                </div>

                {/* Events list */}
                <div className="space-y-1 w-full mt-1">
                  {day.events.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className={`text-[10px] leading-tight font-medium px-1.5 py-0.5 rounded truncate ${
                        ev.category === 'island'
                          ? 'text-sky-900 bg-sky-100/80 font-semibold'
                          : ev.category === 'traditional'
                          ? 'text-rose-900 bg-rose-100/80 font-semibold'
                          : ev.category === 'school'
                          ? 'text-amber-900 bg-amber-100/80 font-semibold'
                          : ev.category === 'user'
                          ? 'text-indigo-900 bg-indigo-100/80'
                          : 'text-slate-800 bg-slate-100'
                      }`}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}

                  {day.events.length > 2 && (
                    <div className="text-[9px] text-slate-500 font-medium">
                      +{day.events.length - 2} sự kiện khác
                    </div>
                  )}

                  {hasUserNotes && (
                    <div className="flex items-center gap-1 text-[9px] text-indigo-700 font-semibold">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>Có kế hoạch</span>
                    </div>
                  )}
                </div>

                {/* Footer hint */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-sky-600 font-medium self-end">
                  Xem →
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
