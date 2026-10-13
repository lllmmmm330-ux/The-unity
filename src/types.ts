export type ActiveTool = 
  | 'pdf-merge'
  | 'pdf-compress'
  | 'pdf-sign'
  | 'img-to-pdf'
  | 'bg-remove'
  | 'cv-maker';

export interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export interface CvData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  countryCity: string;
  residenceStatus: string; // e.g. "إقامة حماية مؤقتة (كيملك) - تركيا" or "Aufenthaltstitel - ألمانيا" or "إقامة نظامية - الإمارات"
  birthDate: string;
  summary: string;
  photoUrl: string;
  skills: string[];
  languages: { name: string; level: string }[];
  experiences: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    year: string;
  }[];
  template: 'german' | 'gulf' | 'modern';
}

export interface AdUnitConfig {
  format: 'leaderboard' | 'rectangle' | 'banner';
  slotId: string;
  title: string;
  sponsorName: string;
  cpcEstimate: string;
  searchIntentKeyword: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  provider: 'google' | 'email' | 'phone';
  createdAt: string;
  savedFilesCount: number;
}
