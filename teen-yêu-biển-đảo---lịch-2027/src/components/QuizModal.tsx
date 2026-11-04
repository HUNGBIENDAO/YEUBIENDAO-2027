import { useState } from 'react';
import { X, Award, CheckCircle, XCircle, RotateCcw, HelpCircle, Download } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/islandCalendarData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');

  if (!isOpen) return null;

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optIndex: number) => {
    if (selectedAnswers[currentIdx] !== undefined) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIndex,
    });
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, chosenOpt]) => {
    const q = QUIZ_QUESTIONS[Number(qIdx)];
    return acc + (q && q.correctIndex === chosenOpt ? 1 : 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-300" />
            <h2 className="text-base font-bold">Đố Vui Biển Đảo Quê Hương</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {!isSubmitted ? (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="text-sky-700 uppercase tracking-wide">
                    {currentQ.topic}
                  </span>
                  <span>
                    Câu {currentIdx + 1} / {totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h3>

              <div className="space-y-2.5">
                {currentQ.options.map((option: string, optIdx: number) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  const isAnswered = selectedAnswers[currentIdx] !== undefined;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let style = 'border-slate-200 hover:border-sky-300 hover:bg-slate-50 text-slate-700';
                  if (isAnswered) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium';
                    } else if (isSelected) {
                      style = 'border-rose-400 bg-rose-50/80 text-rose-950';
                    } else {
                      style = 'border-slate-200 opacity-60 text-slate-500';
                    }
                  } else if (isSelected) {
                    style = 'border-sky-600 bg-sky-50 text-sky-900';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white border border-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selectedAnswers[currentIdx] !== undefined && (
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-950 animate-in fade-in">
                  <div className="font-bold text-sky-900 mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-sky-700" />
                    <span>Tư liệu kiến thức:</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-40"
                >
                  ← Câu trước
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedAnswers[currentIdx] === undefined}
                  className="px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 disabled:opacity-50 rounded-xl shadow-xs"
                >
                  {currentIdx === totalQuestions - 1 ? 'Xem kết quả' : 'Câu tiếp →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Hoàn Thành Xuất Sắc!</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Bạn trả lời đúng <strong className="text-sky-700 text-base">{correctCount}</strong> / {totalQuestions} câu hỏi.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl text-left space-y-3">
                <div className="text-center border-b border-amber-200 pb-2">
                  <div className="text-[10px] font-bold text-amber-800 uppercase">CHỨNG NHẬN DANH DỰ</div>
                  <div className="text-sm font-extrabold text-amber-950">ĐẠI SỨ TUỔI TRẺ BIỂN ĐẢO 2027</div>
                </div>

                <div className="text-xs space-y-2">
                  <label className="block font-semibold text-amber-900">
                    Họ và tên học sinh / giáo viên:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nhập tên của bạn..."
                    className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-amber-300 focus:outline-none"
                  />
                  <p className="italic text-center text-amber-900 text-[11px] pt-1">
                    "Tổ KHXH trường THCS Hồ Nghinh (Đà Nẵng) biểu dương tinh thần ham học hỏi và tình yêu Hoàng Sa - Trường Sa thiêng liêng!"
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Làm lại
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  In chứng nhận
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
