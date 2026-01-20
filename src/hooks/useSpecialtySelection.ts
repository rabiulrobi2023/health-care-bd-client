import { TSpecialty } from "@/components/modules/admin/SpecialtiesManagement/specialty.interface";
import { TDoctor } from "@/interface/doctor.interface";
import { useEffect, useState } from "react";

interface IUseSpecialtySelectionProps {
  doctor?: TDoctor;
  isUpdate: boolean;
  open: boolean;
}

interface IUseSpecialtySelectionReturn {
  selectedSpecialtyIds: string[];
  removedSpecialtyIds: string[];
  currentSpecialtyId: string;

  setCurrentSpecialtyId: (id: string) => void;
  handleAddSpecialty: () => void;
  handleRemoveSpecialty: (id: string) => void;
  getNewSpecialties: () => string[];
  getAvailableSpecialties: (allSpecialties: TSpecialty[]) => TSpecialty[];
} 

export const useSpecialtySelection = ({
  doctor,
  isUpdate,
  open,
}: IUseSpecialtySelectionProps): IUseSpecialtySelectionReturn => {
  const getInitialSpecialtyIds = () => {
    if (
      isUpdate &&
      doctor?.doctorSpecialtes &&
      doctor.doctorSpecialtes.length > 0
    ) {
      return doctor.doctorSpecialtes.map((ds) => ds.specialtiesId);
    }
    return [];
  };

  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<string[]>(
    getInitialSpecialtyIds
  );

  const [removedSpecialtyIds, setRemovedSpecialtyIds] = useState<string[]>([]);
  const [currentSpecialtyId, setCurrentSpecialtyId] = useState<string>("");

  const handleAddSpecialty = () => {
    if (
      currentSpecialtyId &&
      !selectedSpecialtyIds.includes(currentSpecialtyId)
    ) {
      setSelectedSpecialtyIds((prev) => [...prev, currentSpecialtyId]);
      if (removedSpecialtyIds.includes(currentSpecialtyId)) {
        setRemovedSpecialtyIds(
          removedSpecialtyIds.filter((rs) => rs !== currentSpecialtyId)
        );
      }
      setCurrentSpecialtyId("");
    }
  };

  const handleRemoveSpecialty = (specialtyId: string) => {
    setSelectedSpecialtyIds(
      selectedSpecialtyIds.filter((sp) => sp !== specialtyId)
    );
    if (
      isUpdate &&
      doctor?.doctorSpecialtes &&
      doctor.doctorSpecialtes.length > 0
    ) {
      const wasOriginalSpecialty = doctor.doctorSpecialtes?.some((ds) => {
        const id = ds.specialtiesId;
        return id === specialtyId;
      });

      if (wasOriginalSpecialty && !removedSpecialtyIds.includes(specialtyId)) {
        setRemovedSpecialtyIds([...removedSpecialtyIds, specialtyId]);
      }
    }
  };

  const getNewSpecialties = (): string[] => {
    if (!isUpdate || !doctor?.doctorSpecialtes) {
      return selectedSpecialtyIds;
    }

    const originalSpecialtiesIds =
      doctor.doctorSpecialtes
        .map((ds) => ds.specialtiesId || null)
        .filter((id): id is string => !!id) || [];
    return selectedSpecialtyIds.filter(
      (id) => !originalSpecialtiesIds.includes(id)
    );
  };

  const getAvailableSpecialties = (allSpecialties: TSpecialty[]) => {
    return (
      allSpecialties.filter((s) => !selectedSpecialtyIds.includes(s.id)) || []
    );
  };
  useEffect(() => {
    if (open && doctor) {
      const initialIds = getInitialSpecialtyIds();
      setSelectedSpecialtyIds(initialIds);
      setRemovedSpecialtyIds([]);
      setCurrentSpecialtyId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, doctor?.id]);

  return {
    selectedSpecialtyIds,
    removedSpecialtyIds,
    currentSpecialtyId,
    setCurrentSpecialtyId,
    handleAddSpecialty,
    handleRemoveSpecialty,
    getNewSpecialties,
    getAvailableSpecialties,
  };
};
