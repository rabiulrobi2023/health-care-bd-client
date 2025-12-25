"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteSpecialty } from "@/services/admin/specialtiesManagement";
import { TSpecialty } from "./specialty.interface";
import { SpecialtiesColumns } from "./SpecialtiesColumns";

interface SpecialityTableProps {
  specialities: TSpecialty[];
}

const SpecialitiesTable = ({ specialities }: SpecialityTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [selectedSpeciality, setSelectedSpeciality] =
    useState<TSpecialty | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDeleteClick = (speciality: TSpecialty) => {
    setSelectedSpeciality(speciality);
  };

  const confirmDelete = async () => {
    if (!selectedSpeciality) return;

    const toDelete = selectedSpeciality; // store before clearing state
    setSelectedSpeciality(null); // close dialog immediately

    setIsDeleting(true);
    const result = await deleteSpecialty(toDelete.id);

    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Speciality deleted successfully");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete speciality");
    }
  };

  return (
    <>
      <ManagementTable
        data={specialities}
        columns={SpecialtiesColumns}
        onDelete={handleDeleteClick}
        getRowKey={(speciality) => speciality.id}
        emptyMessage="No specialities found"
      />

      {selectedSpeciality && (
        <DeleteConfirmationDialog
          open={true}
          onOpenChange={() => setSelectedSpeciality(null)}
          onConfirm={confirmDelete}
          title="Delete Speciality"
          description={`Are you sure you want to delete "${selectedSpeciality.title}"? This action cannot be undone.`}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default SpecialitiesTable;
