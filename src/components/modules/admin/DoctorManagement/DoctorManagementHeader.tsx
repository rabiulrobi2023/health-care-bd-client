"use client";

import { useState, useTransition } from "react";
import DoctorFormDialog from "./DoctorFormDialog";
import { useRouter } from "next/navigation";
import { TSpecialty } from "../SpecialtiesManagement/specialty.interface";
import { TDoctor } from "@/interface/doctor.interface";
import MamangementPageHeader from "@/components/shared/MamangementPageHeader";
import { Plus } from "lucide-react";

interface IDoctorMangementHeaderProps {
  specialties?: TSpecialty[];
  doctor?: TDoctor;
}
const DoctorManagementHeader = ({
  specialties,
  doctor,
}: IDoctorMangementHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <DoctorFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        doctor={doctor}
        specialties={specialties}
      ></DoctorFormDialog>
      <MamangementPageHeader
        title="Doctor Management"
        description="Manage and view doctor information"
        action={{
          label: "Add Doctor",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default DoctorManagementHeader;
