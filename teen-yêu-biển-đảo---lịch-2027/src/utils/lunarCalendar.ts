// Vietnamese Lunar Calendar and Holiday Engine for 2026-2027 (Năm Bính Ngọ & Đinh Mùi)
import { LunarDate } from '../types/calendar';

interface LunarMonthAnchor {
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  lunarMonth: number;
  lunarYear: number;
  isLeap: boolean;
  totalDays: number;
}

// Exact lunar months covering late 2026 through early 2028
const LUNAR_ANCHORS: LunarMonthAnchor[] = [
  { solarYear: 2026, solarMonth: 10, solarDay: 10, lunarMonth: 9, lunarYear: 2026, isLeap: false, totalDays: 30 },
  { solarYear: 2026, solarMonth: 11, solarDay: 9, lunarMonth: 10, lunarYear: 2026, isLeap: false, totalDays: 30 },
  { solarYear: 2026, solarMonth: 12, solarDay: 9, lunarMonth: 11, lunarYear: 2026, isLeap: false, totalDays: 30 },
  { solarYear: 2027, solarMonth: 1, solarDay: 8, lunarMonth: 12, lunarYear: 2026, isLeap: false, totalDays: 29 },
  // Tết Đinh Mùi 2027 starts Feb 6, 2027
  { solarYear: 2027, solarMonth: 2, solarDay: 6, lunarMonth: 1, lunarYear: 2027, isLeap: false, totalDays: 30 },
  { solarYear: 2027, solarMonth: 3, solarDay: 8, lunarMonth: 2, lunarYear: 2027, isLeap: false, totalDays: 29 },
  { solarYear: 2027, solarMonth: 4, solarDay: 6, lunarMonth: 3, lunarYear: 2027, isLeap: false, totalDays: 30 },
  { solarYear: 2027, solarMonth: 5, solarDay: 6, lunarMonth: 4, lunarYear: 2027, isLeap: false, totalDays: 29 },
  { solarYear: 2027, solarMonth: 6, solarDay: 4, lunarMonth: 5, lunarYear: 2027, isLeap: false, totalDays: 30 },
  { solarYear: 2027, solarMonth: 7, solarDay: 4, lunarMonth: 6, lunarYear: 2027, isLeap: false, totalDays: 29 },
  { solarYear: 2027, solarMonth: 8, solarDay: 2, lunarMonth: 7, lunarYear: 2027, isLeap: false, totalDays: 29 },
  { solarYear: 2027, solarMonth: 8, solarDay: 31, lunarMonth: 8, lunarYear: 2027, isLeap: false, totalDays: 30 },
  { solarYear: 2027, solarMonth: 9, solarDay: 30, lunarMonth: 9, lunarYear: 2027, isLeap: false, totalDays: 30 },
  { solarYear: 2027, solarMonth: 10, solarDay: 30, lunarMonth: 10, lunarYear: 2027, isLeap: false, totalDays: 29 },
  { solarYear: 2027, solarMonth: 11, solarDay: 28, lunarMonth: 11, lunarYear: 2027, isLeap: false, totalDays: 30 },
  { solarYear: 2027, solarMonth: 12, solarDay: 28, lunarMonth: 12, lunarYear: 2027, isLeap: false, totalDays: 29 },
  { solarYear: 2028, solarMonth: 1, solarDay: 26, lunarMonth: 1, lunarYear: 2028, isLeap: false, totalDays: 30 },
];

export function getLunarDate(solarYear: number, solarMonth: number, solarDay: number): LunarDate {
  const targetDate = new Date(solarYear, solarMonth - 1, solarDay);
  
  for (let i = LUNAR_ANCHORS.length - 1; i >= 0; i--) {
    const anchor = LUNAR_ANCHORS[i];
    const anchorDate = new Date(anchor.solarYear, anchor.solarMonth - 1, anchor.solarDay);
    const diffMs = targetDate.getTime() - anchorDate.getTime();
    if (diffMs >= 0) {
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const lunarDay = diffDays + 1;
      return {
        day: lunarDay,
        month: anchor.lunarMonth,
        year: anchor.lunarYear,
        yearCanChi: anchor.lunarYear === 2027 ? 'Đinh Mùi' : anchor.lunarYear === 2026 ? 'Bính Ngọ' : 'Mậu Thân',
        isLeap: anchor.isLeap,
      };
    }
  }

  return {
    day: ((solarDay + 12) % 29) + 1,
    month: solarMonth,
    year: solarYear,
    yearCanChi: solarYear === 2027 ? 'Đinh Mùi' : 'Bính Ngọ',
    isLeap: false,
  };
}

export function isHoangDaoDay(solarYear: number, solarMonth: number, solarDay: number): boolean {
  const lunar = getLunarDate(solarYear, solarMonth, solarDay);
  const hoangDaoIndices = [0, 2, 3, 5, 8, 9];
  const dayIndex = ((lunar.month * 3 + lunar.day) % 12);
  return hoangDaoIndices.includes(dayIndex);
}

export interface HolidayDetail {
  title: string;
  type: 'national' | 'traditional' | 'island' | 'youth';
  desc?: string;
}

export const SOLAR_HOLIDAYS_MAP: Record<string, HolidayDetail> = {
  '1/1': { title: 'Tết Dương Lịch', type: 'national', desc: 'Chào năm mới 2027' },
  '1/9': { title: 'Ngày Học sinh - Sinh viên', type: 'youth', desc: 'Truyền thống HSSV Việt Nam kiên cường' },
  '2/3': { title: 'Ngày thành lập Đảng', type: 'national', desc: '97 năm ngày thành lập Đảng CSVN' },
  '2/27': { title: 'Ngày Thầy thuốc Việt Nam', type: 'national', desc: 'Tri ân đội ngũ y bác sĩ, quân y trên đảo' },
  '3/8': { title: 'Quốc tế Phụ nữ', type: 'national', desc: 'Chúc mừng phụ nữ Việt Nam' },
  '3/14': { title: 'Tưởng niệm Liệt sĩ Gạc Ma', type: 'island', desc: 'Vòng tròn bất tử Trường Sa 14/3/1988' },
  '3/26': { title: 'Ngày thành lập Đoàn TNCS HCM', type: 'youth', desc: '96 năm Đoàn TNCS Hồ Chí Minh - Tuổi trẻ vì biển đảo' },
  '4/30': { title: 'Giải phóng miền Nam', type: 'national', desc: 'Ngày non sông thu về một mối' },
  '5/1': { title: 'Quốc tế Lao động', type: 'national', desc: 'Ngày Quốc tế Lao động' },
  '5/7': { title: 'Ngày thành lập Hải quân', type: 'island', desc: 'Ngày truyền thống Hải quân Nhân dân Việt Nam (1955)' },
  '5/15': { title: 'Ngày thành lập Đội TNTP', type: 'youth', desc: 'Đội TNTP Hồ Chí Minh' },
  '5/19': { title: 'Sinh nhật Bác Hồ', type: 'national', desc: 'Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh vĩ đại' },
  '6/1': { title: 'Quốc tế Thiếu nhi', type: 'youth', desc: 'Gửi yêu thương đến thiếu nhi nơi đảo xa' },
  '6/5': { title: 'Ngày Bác Hồ ra đi tìm đường cứu nước & Ngày Môi trường', type: 'national', desc: 'Bảo vệ môi trường biển quê hương' },
  '6/8': { title: 'Ngày Đại dương Thế giới', type: 'island', desc: 'Tuần lễ Biển và Hải đảo Việt Nam' },
  '6/21': { title: 'Ngày Báo chí Cách mạng', type: 'national', desc: 'Cây bút đồng hành cùng người lính biển' },
  '7/5': { title: 'Ngày truyền thống DK1', type: 'island', desc: 'Kỷ niệm thành lập Cụm Dịch vụ - Kinh tế - Khoa học DK1 (1989)' },
  '7/27': { title: 'Ngày Thương binh - Liệt sĩ', type: 'national', desc: 'Đời đời nhớ ơn các anh hùng liệt sĩ' },
  '8/19': { title: 'Cách mạng Tháng Tám', type: 'national', desc: 'Cách mạng Tháng Tám thành công' },
  '9/2': { title: 'Quốc khánh Việt Nam', type: 'national', desc: 'Tết Độc lập non sông gấm vóc' },
  '10/10': { title: 'Giải phóng Thủ đô', type: 'national', desc: 'Hà Nội - Trái tim cả nước hướng về biển đảo' },
  '10/15': { title: 'Ngày truyền thống Hội LHTN', type: 'youth', desc: 'Thanh niên Việt Nam tiếp bước cha anh' },
  '10/20': { title: 'Ngày Phụ nữ Việt Nam', type: 'national', desc: 'Tôn vinh người phụ nữ Việt Nam' },
  '10/23': { title: 'Ngày mở đường Hồ Chí Minh trên biển', type: 'island', desc: 'Đoàn tàu Không số huyền thoại (1961)' },
  '11/20': { title: 'Ngày Nhà giáo Việt Nam', type: 'national', desc: 'Tri ân thầy cô giáo trên các điểm đảo' },
  '12/22': { title: 'Ngày thành lập QĐND Việt Nam', type: 'island', desc: 'Ngày hội Quốc phòng toàn dân - Vững vàng biển đảo' },
};

export const LUNAR_HOLIDAYS_MAP: Record<string, HolidayDetail> = {
  '12/23': { title: 'Tết Ông Công Ông Táo', type: 'traditional', desc: '23 tháng Chạp tiễn Táo quân chầu trời' },
  '12/29': { title: 'Đêm Giao Thừa', type: 'traditional', desc: 'Giao thừa năm Đinh Mùi' },
  '12/30': { title: 'Đêm Giao Thừa', type: 'traditional', desc: 'Giao thừa sum vầy' },
  '1/1': { title: 'Mùng 1 Tết Nguyên Đán', type: 'traditional', desc: 'Tết Đinh Mùi 2027 vạn sự như ý' },
  '1/2': { title: 'Mùng 2 Tết', type: 'traditional', desc: 'Xuân ấm áp muôn nơi' },
  '1/3': { title: 'Mùng 3 Tết', type: 'traditional', desc: 'Tết thầy cô, bè bạn' },
  '1/15': { title: 'Tết Nguyên Tiêu', type: 'traditional', desc: 'Rằm tháng Giêng - Ngày thơ Việt Nam' },
  '3/10': { title: 'Giỗ Tổ Hùng Vương', type: 'traditional', desc: 'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba' },
  '4/15': { title: 'Lễ Phật Đản', type: 'traditional', desc: 'Phật đản an lành' },
  '5/5': { title: 'Tết Đoan Ngọ', type: 'traditional', desc: 'Tết diệt sâu bọ mùng 5 tháng 5' },
  '7/15': { title: 'Lễ Vu Lan / Xá tội vong nhân', type: 'traditional', desc: 'Mùa báo hiếu song thân' },
  '8/15': { title: 'Tết Trung Thu', type: 'youth', desc: 'Đêm trăng rằm rộn rã tiếng cười thiếu nhi biển đảo' },
  '9/9': { title: 'Tết Trùng Cửu', type: 'traditional', desc: 'Tết Trùng Cửu ngắm cúc ngâm thơ' },
};
