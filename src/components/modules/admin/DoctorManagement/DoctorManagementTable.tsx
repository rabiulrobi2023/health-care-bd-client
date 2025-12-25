"use client";
import { TDoctor } from "@/interface/doctor.interface";
import ManagementTable from "@/components/shared/ManagementTable";
import doctorColumn from "./doctorColumns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { doctorService } from "@/services/admin/doctorManagement";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface IDoctorManagementTableProps {
  doctor: TDoctor[];
}

const DoctorManagementTable = ({ doctor }: IDoctorManagementTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingDoctor, setDeletingDoctor] = useState<TDoctor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
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
  return (
    <>
      <ManagementTable
        columns={doctorColumn}
        data={doctor}
        onDelete={handleDeleteDoctor}
        emptyMessage="There is no any doctor"
      />
      <>
        <DeleteConfirmationDialog
          open={!!deletingDoctor}
          onOpenChange={() => setDeletingDoctor(null)}
          onConfirm={confirmDeleteDoctor}
          title="Delete Doctor"
          description={`Are your sure you want to doctor ${deletingDoctor?.name}? This action cannot be undone`}
          isDeleting={isDeleting}
        />
      </>
    </>
  );
};

export default DoctorManagementTable;
