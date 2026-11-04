import { useState } from 'react';
import { X, Send, Mail, Heart, CheckCircle2, Copy } from 'lucide-react';
import { SAMPLE_POSTCARDS } from '../data/islandCalendarData';
import { PostcardMessage } from '../types/calendar';

interface LetterToSoldierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LetterToSoldierModal({ isOpen, onClose }: LetterToSoldierModalProps) {
  const [letters, setLetters] = useState<PostcardMessage[]>(() => {
    return SAMPLE_POSTCARDS.map((item, idx) => ({
      ...item,
      id: `letter-${idx}`,
    }));
  });

  const [senderName, setSenderName] = useState('');
  const [senderSchool, setSenderSchool] = useState('Trường THCS Hồ Nghinh (Đà Nẵng)');
  const [targetIsland, setTargetIsland] = useState('Quần đảo Trường Sa');
  const [content, setContent] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [justSent, setJustSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !content.trim()) return;

    const newLetter: PostcardMessage = {
      id: `letter-${Date.now()}`,
      senderName: senderName.trim(),
      senderAgeSchool: senderSchool.trim(),
      senderLocation: 'TP. Đà Nẵng',
      targetIsland,
      recipientRole: 'Kính gửi các chú bộ đội Hải quân & thiếu nhi nơi đảo xa',
      content: content.trim(),
      stampType: 'tem-truong-sa',
      dateStr: new Date().toLocaleDateString('vi-VN'),
    };

    setLetters([newLetter, ...letters]);
    setContent('');
    setJustSent(true);
    setTimeout(() => setJustSent(false), 3500);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-800 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-300" />
            <h2 className="text-base font-bold">Cánh Thư Gửi Các Chú Bộ Đội Hải Quân</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content split */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Write Letter Form (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Send className="w-4 h-4 text-sky-700" />
              <span>Viết thư tay điện tử</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Họ và tên học sinh / thầy cô: *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ví dụ: Lê Bảo Châu - Lớp 8/2..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Trường / Đơn vị:
                </label>
                <input
                  type="text"
                  value={senderSchool}
                  onChange={(e) => setSenderSchool(e.target.value)}
                  placeholder="Trường THCS Hồ Nghinh..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Gửi tới:
                </label>
                <select
                  value={targetIsland}
                  onChange={(e) => setTargetIsland(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Quần đảo Trường Sa">Quần đảo Trường Sa (Khánh Hòa)</option>
                  <option value="Nhà giàn DK1">Cụm Nhà giàn DK1 (Thềm lục địa phía Nam)</option>
                  <option value="Đảo Song Tử Tây">Đảo Song Tử Tây</option>
                  <option value="Đảo Sinh Tồn">Đảo Sinh Tồn</option>
                  <option value="Đảo Bạch Long Vĩ">Đảo Bạch Long Vĩ (Hải Phòng)</option>
                  <option value="Huyện đảo Lý Sơn">Huyện đảo Lý Sơn (Quảng Ngãi)</option>
                  <option value="Đảo Thổ Chu">Quần đảo Thổ Chu (Kiên Giang)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nội dung tâm tình gửi người lính biển: *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Kính chúc các chú hải quân luôn vững vàng tay súng nơi hải đảo tiền tiêu..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Cánh Thư Vượt Sóng</span>
              </button>

              {justSent && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lá thư của bạn đã được niêm phong gửi đi thành công!</span>
                </div>
              )}
            </form>
          </div>

          {/* Letters Wall (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Hòm thư biển đảo ({letters.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500">Mới nhất</span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {letters.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-amber-200 p-4 relative overflow-hidden bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 text-xs"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                      📍 {card.targetIsland}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{card.dateStr}</span>
                  </div>

                  <p className="text-slate-800 italic border-l-2 border-amber-400 pl-3 my-2 leading-relaxed">
                    "{card.content}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <span className="font-bold text-slate-900">
                      {card.senderName} <span className="font-normal text-slate-500">· {card.senderAgeSchool}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(card.id, card.content)}
                      className="text-sky-700 hover:text-sky-900 flex items-center gap-1"
                    >
                      {copiedId === card.id ? (
                        <span className="text-emerald-700 font-bold">Đã chép</span>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
