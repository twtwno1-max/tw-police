export interface PoliceOfficer {
  id: string;
  name: string;
  position: string; // 局長、副局長、分局長
  unit: string; // 單位名稱
  photoUrl?: string;
  education: string[];
  experience: string[];
  appointmentDate: string;
  refUrl?: string;
  isHighlighted?: boolean; // 用於特別標示
}

export interface PoliceUnit {
  name: string;
  type: 'headquarters' | 'district'; // 總局或分局
  officers: PoliceOfficer[];
}

export interface SearchCriteria {
  searchTerm: string;
  selectedUnit: string;
  selectedPosition: string;
}
