import { X, Building2, GraduationCap, MapPin, Award, Users, BookOpen, Compass } from 'lucide-react';
import { Language } from '../types/calendar';

interface SchoolIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function SchoolIntroModal({ isOpen, onClose, language }: SchoolIntroModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-base font-bold leading-tight">
                Trường THCS Hồ Nghinh · TP. Đà Nẵng
              </h2>
              <p className="text-xs text-sky-200">
                Tổ Khoa Học Xã Hội (Lịch sử - Địa lý - GDCD)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs text-slate-700 leading-relaxed">
          {/* Mission intro */}
          <div className="p-4 bg-sky-50/80 rounded-2xl border border-sky-100 space-y-2">
            <div className="font-bold text-sky-950 flex items-center gap-1.5 text-sm">
              <Compass className="w-4 h-4 text-sky-700" />
              <span>Sứ mệnh & Kế hoạch L27: "Em Yêu Biển Đảo Quê Hương"</span>
            </div>
            <p className="text-slate-700">
              Thành phố Đà Nẵng vinh dự và tự hào là đơn vị hành chính quản lý huyện đảo Hoàng Sa thiêng liêng. Trường THCS Hồ Nghinh luôn xác định giáo dục tình yêu biển đảo, chủ quyền biên cương hải phận là trọng tâm cốt lõi trong chương trình Giáo dục Địa phương và các môn Khoa học Xã hội.
            </p>
          </div>

          {/* School Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Địa chỉ & Đơn vị</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Trường THCS Hồ Nghinh, TP. Đà Nẵng. Ngôi trường mang tên nhà cách mạng tiền bối Hồ Nghinh kiên trung.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-sky-700" />
                <span>Tổ Khoa Học Xã Hội</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Gồm các thầy cô giáo bộ môn Lịch sử, Địa lý, GDCD tiên phong đổi mới phương pháp giảng dạy tích hợp số.
              </p>
            </div>
          </div>

          {/* Key Objectives */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-700" />
              <span>Định Hướng Giảng Dạy & Hoạt Động Trải Nghiệm</span>
            </h3>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-700 mt-1.5 shrink-0" />
                <span>
                  <strong>Tham quan thực tế:</strong> Tổ chức các chuyên đề học tập ngoại khóa tại Nhà trưng bày Hoàng Sa (đường Hoàng Sa, quận Sơn Trà, Đà Nẵng).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-700 mt-1.5 shrink-0" />
                <span>
                  <strong>Ứng dụng số hóa:</strong> Sử dụng bộ Niên lịch Biển Đảo 2027 điện tử để tra cứu các mốc lịch sử, sự kiện theo tuần học và lịch thi đua Đội.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-700 mt-1.5 shrink-0" />
                <span>
                  <strong>Hành động thiết thực:</strong> Phong trào "Cánh thư gửi Trường Sa - DK1", thi vẽ tranh, làm báo tường và phong trào nhặt rác bảo vệ bờ biển Mỹ Khê - Non Nước.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Tập thể Ban Giám hiệu & Tổ KHXH THCS Hồ Nghinh chúc các em học sinh một năm học mới 2027 thật nhiều tri thức và luôn mang trong tim ngọn lửa tự hào non sông gấm vóc!
            </span>
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
