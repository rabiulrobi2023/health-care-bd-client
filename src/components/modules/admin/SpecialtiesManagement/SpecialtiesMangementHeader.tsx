"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import MamangementPageHeader from "@/components/shared/MamangementPageHeader";
import { Plus } from "lucide-react";
import SpecialtiesFormDialog from "./SpecialtiesFormDialog";

const SpecialtiesMangementHeader = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <SpecialtiesFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <MamangementPageHeader
        title="Specialties Management"
        description="Manage specialties information and view details"
        action={{
          label: "Add Specialty",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default SpecialtiesMangementHeader;
