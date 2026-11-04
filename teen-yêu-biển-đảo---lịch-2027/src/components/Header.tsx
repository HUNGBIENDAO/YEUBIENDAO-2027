import { useState } from 'react';
import { Volume2, VolumeX, Printer, Award, Building2, Calendar, Globe } from 'lucide-react';
import { oceanSound } from '../utils/oceanAudio';
import { Language, TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  currentView: 'month' | 'year' | 'map' | 'eduhub';
  onSelectView: (view: 'month' | 'year' | 'map' | 'eduhub') => void;
  onOpenQuiz: () => void;
  onOpenPrint: () => void;
  onOpenDayDetail: () => void;
  onOpenSchoolIntro: () => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({
  currentView,
  onSelectView,
  onOpenQuiz,
  onOpenPrint,
  onOpenSchoolIntro,
  currentLanguage,
  onLanguageChange,
}: HeaderProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const t = TRANSLATIONS[currentLanguage];

  const toggleSound = () => {
    const newState = oceanSound.toggle();
    setIsAudioPlaying(newState);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectView('month');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-sky-950 hover:text-sky-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block shrink-0"></span>
          <span>{t.appTitle.toUpperCase()}</span>
        </a>

        {/* Zone 2: 4 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectView('month')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'month'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            {t.navMonth}
          </button>
          <button
            onClick={() => onSelectView('year')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'year'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            {t.navYear}
          </button>
          <button
            onClick={() => onSelectView('map')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'map'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            {t.navMap}
          </button>
          <button
            onClick={() => onSelectView('eduhub')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'eduhub'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            {t.navEdu}
          </button>
        </nav>

        {/* Zone 3: Actions & utilities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound wave toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={isAudioPlaying ? 'Tắt tiếng sóng biển' : 'Bật tiếng sóng biển êm dịu'}
            aria-label="Toggle ocean sound"
            className="p-2 text-slate-500 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 text-sky-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* School Intro button */}
          <button
            type="button"
            onClick={onOpenSchoolIntro}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-900 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200/80 transition-colors whitespace-nowrap shrink-0"
            title="Trường THCS Hồ Nghinh (Đà Nẵng)"
          >
            <Building2 className="w-3.5 h-3.5 text-sky-700" />
            <span>THCS Hồ Nghinh</span>
          </button>

          {/* Quiz CTA */}
          <button
            type="button"
            onClick={onOpenQuiz}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors whitespace-nowrap shrink-0"
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.btnQuiz}</span>
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => onLanguageChange(currentLanguage === 'vi' ? 'en' : 'vi')}
            className="px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
            title="Đổi ngôn ngữ / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentLanguage.toUpperCase()}</span>
          </button>

          {/* Primary Action: Print */}
          <button
            type="button"
            onClick={onOpenPrint}
            className="px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.btnPrint}</span>
            <span className="sm:hidden">In</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 gap-4 text-xs font-medium text-slate-600">
        <button
          onClick={() => onSelectView('month')}
          className={`whitespace-nowrap shrink-0 py-1 ${
            currentView === 'month' ? 'text-sky-700 font-bold border-b-2 border-sky-600' : ''
          }`}
        >
          {t.navMonth}
        </button>
        <button
          onClick={() => onSelectView('year')}
          className={`whitespace-nowrap shrink-0 py-1 ${
            currentView === 'year' ? 'text-sky-700 font-bold border-b-2 border-sky-600' : ''
          }`}
        >
          {t.navYear}
        </button>
        <button
          onClick={() => onSelectView('map')}
          className={`whitespace-nowrap shrink-0 py-1 ${
            currentView === 'map' ? 'text-sky-700 font-bold border-b-2 border-sky-600' : ''
          }`}
        >
          {t.navMap}
        </button>
        <button
          onClick={() => onSelectView('eduhub')}
          className={`whitespace-nowrap shrink-0 py-1 ${
            currentView === 'eduhub' ? 'text-sky-700 font-bold border-b-2 border-sky-600' : ''
          }`}
        >
          {t.navEdu}
        </button>
        <button
          onClick={onOpenSchoolIntro}
          className="whitespace-nowrap shrink-0 py-1 text-sky-900 font-semibold"
        >
          THCS Hồ Nghinh
        </button>
        <button
          onClick={onOpenQuiz}
          className="whitespace-nowrap shrink-0 py-1 text-emerald-800 font-semibold"
        >
          Đố Vui
        </button>
      </div>
    </header>
  );
}
