import { TSpecialty } from "@/components/modules/admin/SpecialtiesManagement/specialty.interface";
import { IDoctor } from "@/interface/doctor.interface";
import { useEffect, useState } from "react";

interface IUseSpecialtySelectionProps {
  doctor?: IDoctor;
  isUpdate: boolean;
  open: boolean;
}

interface IUseSpecialtySelectionReturn {
  selectedSpecialtyIds: string[];
  removedSpecialties: string[];
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
      doctor?.doctorSpecialties &&
      doctor.doctorSpecialties.length > 0
    ) {
      return doctor.doctorSpecialties.map((ds) => ds.specialtiesId);
    }
    return [];
  };

  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<string[]>(
    getInitialSpecialtyIds,
  );

  const [removedSpecialties, setRemovedSpecialtyIds] = useState<string[]>([]);
  const [currentSpecialtyId, setCurrentSpecialtyId] = useState<string>("");

  const handleAddSpecialty = () => {
    if (
      currentSpecialtyId &&
      !selectedSpecialtyIds.includes(currentSpecialtyId)
    ) {
      setSelectedSpecialtyIds((prev) => [...prev, currentSpecialtyId]);
      if (removedSpecialties.includes(currentSpecialtyId)) {
        setRemovedSpecialtyIds(
          removedSpecialties.filter((rs) => rs !== currentSpecialtyId),
        );
      }
      setCurrentSpecialtyId("");
    }
  };

  const handleRemoveSpecialty = (specialtyId: string) => {
    setSelectedSpecialtyIds(
      selectedSpecialtyIds.filter((sp) => sp !== specialtyId),
    );
    if (
      isUpdate &&
      doctor?.doctorSpecialties &&
      doctor.doctorSpecialties.length > 0
    ) {
      const wasOriginalSpecialty = doctor.doctorSpecialties?.some((ds) => {
        const id = ds.specialtiesId;
        return id === specialtyId;
      });

      if (wasOriginalSpecialty && !removedSpecialties.includes(specialtyId)) {
        setRemovedSpecialtyIds([...removedSpecialties, specialtyId]);
      }
    }
  };

  const getNewSpecialties = (): string[] => {
    if (!isUpdate || !doctor?.doctorSpecialties) {
      return selectedSpecialtyIds;
    }

    const originalSpecialtiesIds =
      doctor.doctorSpecialties
        .map((ds) => ds.specialtiesId || null)
        .filter((id): id is string => !!id) || [];
    return selectedSpecialtyIds.filter(
      (id) => !originalSpecialtiesIds.includes(id),
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
    removedSpecialties,
    currentSpecialtyId,
    setCurrentSpecialtyId,
    handleAddSpecialty,
    handleRemoveSpecialty,
    getNewSpecialties,
    getAvailableSpecialties,
  };
};
