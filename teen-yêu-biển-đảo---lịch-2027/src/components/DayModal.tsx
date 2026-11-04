import { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { CalendarDay, UserNote, Language } from '../types/calendar';
import { TRANSLATIONS } from '../utils/translations';

interface DayModalProps {
  day: CalendarDay | null;
  onClose: () => void;
  userNotes: UserNote[];
  onAddNote: (dateKey: string, title: string, content: string, tag: UserNote['tag']) => void;
  onDeleteNote: (noteId: string) => void;
  onNavigateDay: (delta: number) => void;
  language: Language;
}

export function DayModal({
  day,
  onClose,
  userNotes,
  onAddNote,
  onDeleteNote,
  onNavigateDay,
  language,
}: DayModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<UserNote['tag']>('soan_bai');
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!day) return null;

  const t = TRANSLATIONS[language];
  const dateKey = `${day.solarYear}-${String(day.solarMonth).padStart(2, '0')}-${String(day.solarDay).padStart(2, '0')}`;
  const dayOfWeekName = t.dayOfWeek[day.dayOfWeek];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddNote(dateKey, title.trim(), content.trim(), tag);
    setTitle('');
    setContent('');
    setIsFormOpen(false);
  };

  const tagLabels: Record<UserNote['tag'], { label: string; color: string }> = {
    soan_bai: { label: 'Soạn giáo án / Bài giảng', color: 'bg-blue-100 text-blue-800' },
    hoat_dong_doi: { label: 'Hoạt động Đội / Đoàn', color: 'bg-emerald-100 text-emerald-800' },
    kiem_tra: { label: 'Kiểm tra / Thi cử', color: 'bg-amber-100 text-amber-800' },
    su_kien: { label: 'Sự kiện ngoại khóa', color: 'bg-rose-100 text-rose-800' },
    khac: { label: 'Kế hoạch khác', color: 'bg-slate-100 text-slate-800' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-800 to-indigo-900 text-white p-6 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onNavigateDay(-1)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Ngày hôm trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateDay(1)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Ngày hôm sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs uppercase tracking-wider text-sky-200 font-semibold mb-1">
            Lịch Chi Tiết · Năm {day.solarYear}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {dayOfWeekName}, {day.solarDay}/{day.solarMonth}/{day.solarYear}
          </h2>

          <div className="mt-2 text-xs sm:text-sm text-sky-100 flex flex-wrap items-center gap-2">
            <span>Âm lịch: Ngày <strong>{day.lunar.day}</strong> tháng <strong>{day.lunar.month}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Năm {day.lunar.yearCanChi}</span>
            <span aria-hidden="true">·</span>
            <span className={day.hoangDao ? 'text-amber-300 font-bold' : 'text-slate-300'}>
              {day.hoangDao ? `★ ${t.hoangDao}` : t.hacDao}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Events list */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-sky-600" />
              Sự kiện ngày này
            </h3>

            {day.events.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                Không có sự kiện cố định. Ngày bình thường trong năm học.
              </p>
            ) : (
              <div className="space-y-2">
                {day.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{ev.title}</span>
                      <span className="text-[10px] uppercase font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                        {ev.category}
                      </span>
                    </div>
                    {ev.description && (
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {ev.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Notes list */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ghi chú của bạn ({userNotes.length})
              </h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isFormOpen ? 'Thu gọn' : 'Thêm ghi chú'}</span>
              </button>
            </div>

            {userNotes.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                Chưa có ghi chú nào cho ngày này. Thêm giáo án, bài kiểm tra hoặc hoạt động Đội!
              </p>
            ) : (
              <div className="space-y-2">
                {userNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{note.title}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${tagLabels[note.tag]?.color}`}>
                          {tagLabels[note.tag]?.label}
                        </span>
                      </div>
                      {note.content && (
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {note.content}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteNote(note.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Xóa ghi chú"
                      aria-label="Xóa ghi chú"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Note creation form */}
            {isFormOpen && (
              <form onSubmit={handleSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs animate-in fade-in">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tiêu đề ghi chú: *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ví dụ: Dạy bài Hoàng Sa - Lịch sử lớp 8..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phân loại tag:
                  </label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value as UserNote['tag'])}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="soan_bai">Soạn giáo án / Bài giảng</option>
                    <option value="hoat_dong_doi">Hoạt động Đội / Chi đoàn</option>
                    <option value="kiem_tra">Kiểm tra / Thi cử</option>
                    <option value="su_kien">Sự kiện ngoại khóa biển đảo</option>
                    <option value="khac">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nội dung chi tiết:
                  </label>
                  <textarea
                    rows={2}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nội dung nhắc việc hoặc dặn dò học sinh..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs"
                  >
                    Lưu ghi chú
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
