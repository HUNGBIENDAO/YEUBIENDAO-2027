/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Dự án: Lịch Biển Đảo 2027 (Kế hoạch L27)
 * Đã tối ưu hoá Clean Code, fix lỗi runtime và chuẩn hoá TypeScript.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { MonthlyView } from './components/MonthlyView';
import { YearView } from './components/YearView';
import { SeaMap } from './components/SeaMap';
import { EduHub } from './components/EduHub';
import { DayModal } from './components/DayModal';
import { QuizModal } from './components/QuizModal';
import { PrintCalendarView } from './components/PrintCalendarView';
import { LetterToSoldierModal } from './components/LetterToSoldierModal';
import { SchoolIntroModal } from './components/SchoolIntroModal';
import { CalendarDay, DayEvent, UserNote } from './types/calendar';
import { FIXED_DAY_EVENTS_2027 } from './data/calendarData2027';
import { getLunarDate, isHoangDaoDay } from './utils/lunarCalendar';
import { Language, TRANSLATIONS } from './utils/translations';
import { Compass, Building2 } from 'lucide-react';

// Dữ liệu ghi chú mặc định ban đầu
const INITIAL_NOTES: Record<string, UserNote[]> = {
  '2026-11-20': [
    {
      id: 'init-2026-1',
      dateKey: '2026-11-20',
      title: 'Lễ kỷ niệm Ngày Nhà giáo Việt Nam 20/11',
      content: 'Tổ chức sinh hoạt chuyên đề tri ân thầy cô giáo cống hiến nơi xã đảo tiền tiêu.',
      tag: 'hoat_dong_doi',
      createdAt: Date.now(),
    },
  ],
  '2026-12-22': [
    {
      id: 'init-2026-2',
      dateKey: '2026-12-22',
      title: 'Ngày thành lập QĐND Việt Nam & Cụm DK1',
      content: 'Giao lưu trực tuyến hoặc viết thư chúc mừng cán bộ chiến sĩ Nhà giàn DK1.',
      tag: 'hoat_dong_doi',
      createdAt: Date.now(),
    },
  ],
  '2027-01-11': [
    {
      id: 'init-1',
      dateKey: '2027-01-11',
      title: 'Soạn bài: Địa lý biển đảo Đông Bắc',
      content: 'Chuẩn bị tranh ảnh vịnh Hạ Long và tư liệu đảo Cô Tô cho học sinh lớp 8.',
      tag: 'soan_bai',
      createdAt: Date.now(),
    },
  ],
  '2027-03-14': [
    {
      id: 'init-2',
      dateKey: '2027-03-14',
      title: 'Chiếu phim tài liệu Vòng tròn bất tử Gạc Ma',
      content: 'Tiết sinh hoạt lớp chuyên đề tưởng niệm 64 liệt sĩ bảo vệ chủ quyền Trường Sa.',
      tag: 'hoat_dong_doi',
      createdAt: Date.now(),
    },
  ],
};

export default function App() {
  // Trạng thái góc nhìn chính (View State)
  const [currentView, setCurrentView] = useState<'month' | 'year' | 'map' | 'eduhub'>('month');
  const [currentYear, setCurrentYear] = useState<number>(2027);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  // Trạng thái hiển thị các Modal Dialog
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);
  const [isSchoolIntroOpen, setIsSchoolIntroOpen] = useState<boolean>(false);

  // Quản lý Ngôn ngữ (Language Persistence)
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('sea_calendar_lang');
      if (savedLang === 'en' || savedLang === 'vi') return savedLang;
    } catch (e) {
      console.warn('Không thể đọc cấu hình ngôn ngữ từ localStorage', e);
    }
    return 'vi';
  });

  const t = useMemo(() => TRANSLATIONS[currentLanguage], [currentLanguage]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('sea_calendar_lang', lang);
    } catch (e) {
      console.warn('Không thể lưu cấu hình ngôn ngữ', e);
    }
  };

  // Quản lý Ghi chú người dùng (User Notes Persistence)
  const [userNotes, setUserNotes] = useState<Record<string, UserNote[]>>(() => {
    try {
      const stored = localStorage.getItem('sea_calendar_notes_2027');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu ghi chú từ localStorage, dùng mặc định.', e);
    }
    return INITIAL_NOTES;
  });

  // Tự động đồng bộ Notes vào localStorage khi có thay đổi
  useEffect(() => {
    try {
      localStorage.setItem('sea_calendar_notes_2027', JSON.stringify(userNotes));
    } catch (e) {
      console.warn('Không thể lưu ghi chú vào localStorage', e);
    }
  }, [userNotes]);

  // Hàm khởi tạo thông tin CalendarDay chuẩn hóa
  const makeCalendarDay = useCallback(
    (y: number, m: number, d: number): CalendarDay => {
      const dateObj = new Date(y, m - 1, d);
      const lunar = getLunarDate(y, m, d);
      const dateKey = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const fixedEvents = FIXED_DAY_EVENTS_2027[dateKey] || [];
      const notes = userNotes[dateKey] || [];
      const customEvents: DayEvent[] = notes.map((n) => ({
        id: n.id,
        title: n.title,
        category: 'user' as const,
        description: n.content,
      }));

      return {
        date: dateObj,
        solarDay: d,
        solarMonth: m,
        solarYear: y,
        dayOfWeek: dateObj.getDay(),
        lunar,
        isCurrentMonth: y === currentYear && m === currentMonth,
        isToday: false,
        events: [...fixedEvents, ...customEvents],
        hoangDao: isHoangDaoDay(y, m, d),
      };
    },
    [currentYear, currentMonth, userNotes]
  );

  // Thêm ghi chú mới (Đã sửa lỗi substr -> slice)
  const handleAddNote = (
    dateKey: string,
    title: string,
    content: string,
    tag: UserNote['tag']
  ) => {
    const randomHash = Math.random().toString(36).slice(2, 6);
    const newNote: UserNote = {
      id: `note-${Date.now()}-${randomHash}`,
      dateKey,
      title,
      content,
      tag,
      createdAt: Date.now(),
    };

    setUserNotes((prev) => {
      const currentList = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: [...currentList, newNote],
      };
    });
  };

  // Xóa ghi chú
  const handleDeleteNote = (noteId: string) => {
    if (!selectedDay) return;
    const dateKey = `${selectedDay.solarYear}-${String(selectedDay.solarMonth).padStart(2, '0')}-${String(selectedDay.solarDay).padStart(2, '0')}`;

    setUserNotes((prev) => {
      const currentList = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: currentList.filter((n) => n.id !== noteId),
      };
    });
  };

  // Lấy danh sách ghi chú ngày đang chọn
  const notesForSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    const dateKey = `${selectedDay.solarYear}-${String(selectedDay.solarMonth).padStart(2, '0')}-${String(selectedDay.solarDay).padStart(2, '0')}`;
    return userNotes[dateKey] || [];
  }, [selectedDay, userNotes]);

  // Mở chi tiết ngày
  const handleOpenDayDetail = () => {
    const targetDay = selectedDay ? selectedDay.solarDay : 15;
    const dayItem = makeCalendarDay(currentYear, currentMonth, targetDay);
    setSelectedDay(dayItem);
  };

  // Chọn ngày từ chế độ xem Năm
  const handleSelectDateFromYearView = (y: number, m: number, d: number) => {
    setCurrentYear(y);
    setCurrentMonth(m);
    const dayItem = makeCalendarDay(y, m, d);
    setSelectedDay(dayItem);
  };

  // Điều hướng ngày liên tiếp trong Modal xem chi tiết
  const handleNavigateDay = (delta: number) => {
    if (!selectedDay) return;
    const curDate = new Date(selectedDay.solarYear, selectedDay.solarMonth - 1, selectedDay.solarDay);
    curDate.setDate(curDate.getDate() + delta);
    const y = curDate.getFullYear();
    const m = curDate.getMonth() + 1;
    const d = curDate.getDate();

    const nextDayItem = makeCalendarDay(y, m, d);
    setSelectedDay(nextDayItem);

    if (y !== currentYear || m !== currentMonth) {
      setCurrentYear(y);
      setCurrentMonth(m);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      {/* Thanh điều hướng chính (Header) */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        onOpenDayDetail={handleOpenDayDetail}
        onOpenSchoolIntro={() => setIsSchoolIntroOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Khu vực nội dung ứng dụng */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'month' && (
          <MonthlyView
            currentYear={currentYear}
            currentMonth={currentMonth}
            onMonthChange={(y, m) => {
              setCurrentYear(y);
              setCurrentMonth(m);
            }}
            onSelectDay={setSelectedDay}
            userNotes={userNotes}
            onOpenLetterModal={() => setIsLetterOpen(true)}
            language={currentLanguage}
          />
        )}

        {currentView === 'year' && (
          <YearView
            onSelectMonth={(y, m) => {
              setCurrentYear(y);
              setCurrentMonth(m);
              setCurrentView('month');
            }}
            onSelectDate={handleSelectDateFromYearView}
            language={currentLanguage}
          />
        )}

        {currentView === 'map' && <SeaMap />}

        {currentView === 'eduhub' && (
          <EduHub
            onOpenLetterModal={() => setIsLetterOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenSchoolIntro={() => setIsSchoolIntroOpen(true)}
          />
        )}
      </main>

      {/* Chân trang (Editorial Footer) */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-8 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Compass className="w-4 h-4 text-sky-600 shrink-0" />
            <span>{t.appTitle} · {t.appSubtitle}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500">
            <button
              type="button"
              onClick={() => setIsSchoolIntroOpen(true)}
              className="inline-flex items-center gap-1.5 text-sky-800 hover:text-sky-950 font-bold bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200 transition-colors cursor-pointer"
              title="Xem giới thiệu BGH & Tổ KHXH Trường THCS Hồ Nghinh (Đà Nẵng)"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span>THCS Hồ Nghinh (Đà Nẵng) · Tổ KHXH</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>{t.forSecondarySchool}</span>
            <span aria-hidden="true">·</span>
            <span>{t.sovereigntyTag}</span>
          </div>

          <div className="text-slate-400 text-[11px]">
            {t.curriculumTag}
          </div>
        </div>
      </footer>

      {/* Các cửa sổ Modal chính */}
      <SchoolIntroModal
        isOpen={isSchoolIntroOpen}
        onClose={() => setIsSchoolIntroOpen(false)}
        language={currentLanguage}
      />

      <DayModal
        day={selectedDay}
        onClose={() => setSelectedDay(null)}
        userNotes={notesForSelectedDay}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onNavigateDay={handleNavigateDay}
        language={currentLanguage}
      />

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <PrintCalendarView
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        activeYear={currentYear}
        activeMonth={currentMonth}
      />

      <LetterToSoldierModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />
    </div>
  );
}
