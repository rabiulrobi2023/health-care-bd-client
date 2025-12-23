import { TGender } from "./share.interface";

export interface TDoctor {
  id?: string;
  email: string;
  name: string;
  password: string;
  contactNumber: string;
  address?: string;
  gender: TGender;
  profilePhoto?: string;
  qualification: string;
  registrationNumber: string;
  experience: number;
  currentWorkingPlace: string;
  designation: string;
  appontmentFee: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  doctorSpecialtes?: Array<{
    specialties?: {
      id: string;
      titile: string;
      icon?: string;
    };
  }>;
}
