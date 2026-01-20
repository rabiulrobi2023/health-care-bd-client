"use client";
import { TDoctor } from "@/interface/doctor.interface";
import ManagementTable from "@/components/shared/ManagementTable";
import doctorColumn from "./doctorColumns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { doctorService } from "@/services/admin/doctorManagement";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import DoctorViewDetailDialog from "./DoctorViewDetailsDialog";
import DoctorFormDialog from "./DoctorFormDialog";
import { TSpecialty } from "../SpecialtiesManagement/specialty.interface";
import { TUserInfoFormToken } from "@/types/types";

interface IDoctorManagementTableProps {
  doctor: TDoctor[];
  specialties: TSpecialty[];
  userInfo: TUserInfoFormToken;
}

const DoctorManagementTable = ({
  doctor,
  specialties,
  userInfo,
}: IDoctorManagementTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingDoctor, setDeletingDoctor] = useState<TDoctor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingDoctor, setViewingDoctor] = useState<TDoctor | null>(null);
  const [updatingDoctor, setUpdatingDoctor] = useState<TDoctor | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDeleteDoctor = (doctor: TDoctor) => setDeletingDoctor(doctor);

  const confirmDeleteDoctor = async () => {
    if (!deletingDoctor) return;
    setIsDeleting(true);

    const result = await doctorService.deleteDoctor(
      deletingDoctor.id as string
    );
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Doctor deleted successfully");
      setIsDeleting(false);
      handleRefresh();
    }
  };

  const handleDoctorUpdateDoctor = (doctor: TDoctor) =>
    setUpdatingDoctor(doctor);


  const handleView = (doctor: TDoctor) => setViewingDoctor(doctor);
  return (
    <>
      <ManagementTable
        columns={doctorColumn}
        data={doctor}
        onDelete={handleDeleteDoctor}
        onView={handleView}
        onEdit={handleDoctorUpdateDoctor}
        emptyMessage="There is no any doctor"
      />

      <DoctorViewDetailDialog
        open={!!viewingDoctor}
        onClose={() => setViewingDoctor(null)}
        doctor={viewingDoctor}
      />
      <DoctorFormDialog
        open={!!updatingDoctor}
        onClose={() => setUpdatingDoctor(null)}
        doctor={updatingDoctor!}
        specialties={specialties}
        onSuccess={handleRefresh}
        userInfo={userInfo}
      />

      <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={() => setDeletingDoctor(null)}
        onConfirm={confirmDeleteDoctor}
        title="Delete Doctor"
        description={`Are your sure you want to doctor ${deletingDoctor?.name}? This action cannot be undone`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default DoctorManagementTable;
