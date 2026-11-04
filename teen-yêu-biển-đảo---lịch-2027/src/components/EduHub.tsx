import { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Mail,
  Building2,
  CheckCircle,
  FileText,
  Compass,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface EduHubProps {
  onOpenLetterModal: () => void;
  onOpenQuiz: () => void;
  onOpenSchoolIntro: () => void;
}

export function EduHub({ onOpenLetterModal, onOpenQuiz, onOpenSchoolIntro }: EduHubProps) {
  const [activeTab, setActiveTab] = useState<'topics' | 'challenges' | 'resources'>('topics');
  const [completedChallenges, setCompletedChallenges] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: true,
    5: false,
  });

  const toggleChallenge = (id: number) => {
    setCompletedChallenges((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const teachingTopics = [
    {
      id: 1,
      title: 'Chuyên đề 1: Bằng chứng lịch sử & pháp lý về chủ quyền Hoàng Sa, Trường Sa',
      subject: 'Lịch sử lớp 7 & 8',
      desc: 'Tư liệu châu bản triều Nguyễn, bản đồ An Nam Đại Quốc Họa Đồ (1838), Đại Nam Thực Lục, và hoạt động của Hải đội Hoàng Sa.',
      activities: 'Thực hành khai thác sơ đồ tư duy; phân tích văn bản pháp lý cổ; tham quan ảo Nhà trưng bày Hoàng Sa (Đà Nẵng).',
    },
    {
      id: 2,
      title: 'Chuyên đề 2: Vị thế địa chính trị và tiềm năng kinh tế biển Việt Nam',
      subject: 'Địa lý lớp 8',
      desc: 'Đặc điểm bờ biển 3.260 km, 28 tỉnh thành giáp biển; vùng nội thủy, lãnh hải, vùng đặc quyền kinh tế (EEZ) và thềm lục địa theo UNCLOS 1982.',
      activities: 'Vẽ lược đồ các điểm đảo tiền tiêu; tính toán khoảng cách hải lý; thảo luận nhóm về các ngành kinh tế biển xanh.',
    },
    {
      id: 3,
      title: 'Chuyên đề 3: Đa dạng sinh học và bảo tồn hệ sinh thái biển đảo',
      subject: 'Khoa học Tự nhiên & Sinh học',
      desc: 'Hệ sinh thái rạn san hô, thảm cỏ biển, rừng ngập mặn; các loài nguy cấp như rùa biển Vích (Côn Đảo), bò biển Dugong (Phú Quốc), Voọc Cát Bà.',
      activities: 'Xây dựng áp phích tuyên truyền giảm rác nhựa dùng một lần; cam kết học sinh không sử dụng túi nilon.',
    },
    {
      id: 4,
      title: 'Chuyên đề 4: Tình yêu biển đảo qua thi ca và nghệ thuật',
      subject: 'Ngữ văn & Hoạt động Trải nghiệm',
      desc: 'Tác phẩm ký sự "Cô Tô" (Nguyễn Tuân), thơ về Trường Sa, những ca khúc hào hùng về người lính biển kiên trung.',
      activities: 'Hội thi viết thư gửi chiến sĩ Trường Sa - DK1; thuyết trình góc văn học biển đảo trong giờ sinh hoạt Chi đội.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-teal-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-wider font-bold text-sky-300 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Không Gian Dạy Học & Trải Nghiệm Giáo Dục Biển Đảo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            EduHub: Tích Hợp Giáo Dục Địa Phương & Liên Môn
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Nền tảng hỗ trợ giáo viên và học sinh bậc THCS (đặc biệt Tổ Khoa học Xã hội trường THCS Hồ Nghinh, TP. Đà Nẵng) triển khai các tiết học tích hợp Lịch sử - Địa lý - GDCD, hoạt động Đội và phong trào "Thiếu nhi với biển đảo quê hương".
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={onOpenQuiz}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Làm bài trắc nghiệm Đố Vui Biển Đảo</span>
            </button>
            <button
              type="button"
              onClick={onOpenLetterModal}
              className="px-4 py-2 text-xs font-bold text-sky-950 bg-white hover:bg-sky-50 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-sky-700" />
              <span>Viết thư gửi chiến sĩ nơi đảo xa</span>
            </button>
            <button
              type="button"
              onClick={onOpenSchoolIntro}
              className="px-4 py-2 text-xs font-bold text-sky-100 bg-sky-800/80 hover:bg-sky-700 rounded-xl border border-sky-600/60 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Giới thiệu THCS Hồ Nghinh (Đà Nẵng)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation tabs for EduHub */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'topics' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Chuyên Đề Dạy Học Liên Môn
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'challenges' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Thử Thách Hành Động Của Teen
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'resources' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tài Liệu & Nguồn Tham Khảo
        </button>
      </div>

      {/* Tab 1: Teaching Topics */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {teachingTopics.map((top) => (
            <div
              key={top.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3 hover:border-sky-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                  {top.subject}
                </span>
                <span className="text-xs text-slate-400 font-mono">Chuyên đề 0{top.id}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {top.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {top.desc}
              </p>

              <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-700 space-y-1 border border-slate-100">
                <div className="font-semibold text-slate-900 flex items-center gap-1 text-[11px]">
                  <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                  <span>Hoạt động học tập gợi ý:</span>
                </div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  {top.activities}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Action Challenges */}
      {activeTab === 'challenges' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              Sổ Tay Hành Động Xanh: "Tuổi Trẻ Học Đường Vì Biển Đảo Quê Hương"
            </h2>
            <p className="text-xs text-slate-500">
              Tích lũy các việc làm tốt mỗi tuần để rèn luyện ý thức công dân và trách nhiệm với đại dương.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 1, title: 'Tiết kiệm nước ngọt sinh hoạt', desc: 'Nhớ về sự chắt chiu từng giọt nước mưa của các chú lính đảo Trường Sa, DK1.' },
              { id: 2, title: 'Nói không với chai nhựa dùng một lần', desc: 'Luôn mang theo bình nước thủy tinh hoặc inox cá nhân tới trường.' },
              { id: 3, title: 'Tìm hiểu Công ước Luật biển UNCLOS 1982', desc: 'Đọc và ghi nhớ quyền chủ quyền và quyền tài phán của Việt Nam trên Biển Đông.' },
              { id: 4, title: 'Gửi cánh thư / vẽ tranh về biển đảo', desc: 'Gửi tình cảm ấm áp tới các thầy trò và chiến sĩ trên các điểm đảo tiền tiêu.' },
              { id: 5, title: 'Lan tỏa thông điệp bảo tồn rùa biển & san hô', desc: 'Chia sẻ kiến thức với gia đình và bạn bè không mua bán các sản vật san hô, đồi mồi.' },
            ].map((c) => (
              <div
                key={c.id}
                onClick={() => toggleChallenge(c.id)}
                className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                  completedChallenges[c.id]
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                    completedChallenges[c.id] ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                  }`}
                >
                  {completedChallenges[c.id] && <CheckCircle className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-snug">{c.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Official References */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Nguồn Tư Liệu Chính Thống Về Biển Đảo Việt Nam
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-700" />
                <span>Nhà Trưng Bày Hoàng Sa (Đà Nẵng)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Nơi lưu giữ hàng trăm hiện vật, bản đồ, châu bản khẳng định chủ quyền của Việt Nam đối với quần đảo Hoàng Sa.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-700" />
                <span>Ủy Ban Biên Giới Quốc Gia</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Cung cấp các văn bản pháp lý chính thức về đường cơ sở, lãnh hải và Công ước Luật biển UNCLOS 1982.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-700" />
                <span>Quân Chủng Hải Quân VN</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Tư liệu về các thế hệ chiến sĩ Trường Sa, nhà giàn DK1 và truyền thống hào hùng của người lính biển.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
