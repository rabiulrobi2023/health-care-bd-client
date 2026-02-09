import { TGender } from "./share.interface";

export interface IDoctor {
  id?: string;
  email: string;
  name: string;
  contactNumber: string;
  address?: string;
  gender: TGender;
  profilePhoto?: File | string;
  qualification: string;
  registrationNumber: string;
  experience: number;
  currentWorkingPlace: string;
  designation: string;
  specialties: string[];
  removedSpecialties?: string[];
  appoinmentFee: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  doctorSpecialties?: Array<{
    doctorId: string;
    specialtiesId: string;
    specialties: {
      id: string;
      title: string;
      icon?: string;
    };
  }>;
  isDeleted?: boolean;
}
