"use client";

import { useState, useTransition } from "react";
import DoctorFormDialog from "./DoctorFormDialog";
import { useRouter } from "next/navigation";
import { TSpecialty } from "../SpecialtiesManagement/specialty.interface";
import { IDoctor } from "@/interface/doctor.interface";
import MamangementPageHeader from "@/components/shared/MamangementPageHeader";
import { Plus } from "lucide-react";

interface IDoctorMangementHeaderProps {
  specialties?: TSpecialty[];
  doctor?: IDoctor;
}
const DoctorManagementHeader = ({
  specialties,
  doctor,
}: IDoctorMangementHeaderProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);
  const [, startTransition] = useTransition();

  const handleOpenDialog = () => {
    setDialogKey((pre) => pre + 1);
    setIsDialogOpen(true);
  };
  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <DoctorFormDialog
        key={dialogKey}
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
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default DoctorManagementHeader;
