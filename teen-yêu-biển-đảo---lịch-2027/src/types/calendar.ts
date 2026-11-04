export type Language = 'vi' | 'en';

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  yearCanChi: string;
  dayCanChi?: string;
  isLeap?: boolean;
  tietKhi?: string;
}

export interface DayEvent {
  id: string;
  title: string;
  category: 'national' | 'traditional' | 'island' | 'youth' | 'school' | 'user';
  description?: string;
}

export interface UserNote {
  id: string;
  dateKey: string; // YYYY-MM-DD
  title: string;
  content: string;
  tag: 'soan_bai' | 'hoat_dong_doi' | 'kiem_tra' | 'su_kien' | 'khac';
  createdAt: number;
}

export interface CalendarDay {
  date: Date;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  dayOfWeek: number; // 0 = CN, 1 = T2...
  lunar: LunarDate;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: DayEvent[];
  hoangDao?: boolean;
}

export interface MonthlyThemeData {
  month: number;
  islandName: string;
  archipelago: string;
  province: string;
  coordinates: string;
  title: string;
  mottoQuote: string;
  authorQuote?: string;
  image: string;
  story: string;
  teachingPrompt: string;
  biodiversity: {
    name: string;
    description: string;
    isEndangered?: boolean;
  }[];
  historicalHighlight: {
    year: string;
    event: string;
  };
}

export type IslandTheme = MonthlyThemeData;

export interface IslandLocation {
  id: string;
  name: string;
  archipelago: string;
  region: 'Bắc Bộ' | 'Bắc Trung Bộ' | 'Nam Trung Bộ' | 'Đông Nam Bộ' | 'Tây Nam';
  coords: { x: number; y: number };
  latLngStr: string;
  significance: string;
  featuredMonth: number;
  funFact: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface PostcardMessage {
  id: string;
  senderName: string;
  senderAgeSchool: string;
  senderLocation: string;
  targetIsland: string;
  recipientRole: string;
  content: string;
  stampType: string;
  dateStr: string;
}
