export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  gender: string;
  experience: number;
  rating: number;
  createdAt: Date;
}

export interface DoctorFilters {
  gender?: string;
  specialty?: string;
  experience?: number;
}
