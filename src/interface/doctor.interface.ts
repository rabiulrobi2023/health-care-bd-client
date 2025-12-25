import { TGender } from "./share.interface";

export interface TDoctor {
  id?: string;
  email: string;
  name: string;
  contactNumber: string;
  address?: string;
  gender: TGender;
  profilePhoto?: string;
  qualification: string;
  registrationNumber: string;
  experience: number;
  currentWorkingPlace: string;
  designation: string;
  appoinmentFee: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  doctorSpecialtes?: Array<{
    id: string;
    titile: string;
    icon?: string;
  }>;
  isDeleted?: boolean;
}
