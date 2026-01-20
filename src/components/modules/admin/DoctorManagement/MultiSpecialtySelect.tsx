import React from "react";
import { TSpecialty } from "../SpecialtiesManagement/specialty.interface";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISpecialyMultiSelectProps {
  selectedSpecialtyIds: string[];
  removedSpecialtyIds: string[];
  currentSpecialtyId: string;
  availableSpecialties: TSpecialty[];
  isEdit: boolean;
  onCurrentSpecialtyChange: (id: string) => void;
  onAddSpecialty: () => void;
  onRemoveSpecialty: (id: string) => void;
  getSpecialtyTitle: (id: string) => string;
  getNewSpecialtes: () => string[];
}

const MultiSpecialtySelect = ({
  selectedSpecialtyIds,
  removedSpecialtyIds,
  currentSpecialtyId,
  availableSpecialties,
  isEdit,
  onCurrentSpecialtyChange,
  onAddSpecialty,
  onRemoveSpecialty,
  getSpecialtyTitle,
  getNewSpecialtes,
}: ISpecialyMultiSelectProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="specialties">Specialties</FieldLabel>
      <Input
        type="hidden"
        name="specialties"
        value={JSON.stringify(
          isEdit ? getNewSpecialtes() : selectedSpecialtyIds,
        )}
      />

      <Input
        type="hidden"
        name="removeSpecialties"
        value={JSON.stringify(removedSpecialtyIds)}
      />

      {selectedSpecialtyIds?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSpecialtyIds.map((id) => (
            <Badge
              key={id}
              className="flex items-center gap-1 rounded-sm bg-neutral-200 px-2 py-1 text-gray-600"
            >
              <span className="text-sm">{getSpecialtyTitle(id)}</span>

              <Button
                type="button"
                onClick={() => onRemoveSpecialty(id)}
                className="h-4 w-4 p-0 bg-transparent hover:bg-transparent"
              >
                <X className="h-4 w-4 text-gray-500 group-hover:text-red-600" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Select
          value={currentSpecialtyId}
          onValueChange={onCurrentSpecialtyChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a specialty to add" />
          </SelectTrigger>
          <SelectContent>
            {availableSpecialties.length > 0 ? (
              availableSpecialties.map((specialty) => (
                <SelectItem key={specialty.id} value={specialty?.id}>
                  {specialty?.title}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                {selectedSpecialtyIds?.length > 0
                  ? "All specialties selected"
                  : "No speciaties availabe"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Button
          type="button"
          onClick={onAddSpecialty}
          disabled={!currentSpecialtyId}
        >
          Add
        </Button>
      </div>
      <p className="text-sn text-red-500">
        {isEdit
          ? "Add new specialties or remove existing ones"
          : selectedSpecialtyIds.length === 0 &&
            "Select at least one specialty for the doctor"}
      </p>

      {isEdit && (
        <div>
          {getNewSpecialtes()?.length > 0 && (
            <p>
              ✓ Will add:{" "}
              {getNewSpecialtes()
                ?.map((specialtyId) => getSpecialtyTitle(specialtyId))
                .join(", ")}
            </p>
          )}
        </div>
      )}

      {removedSpecialtyIds?.length > 0 && (
        <p>
          ⨉ Will remove:{" "}
          {removedSpecialtyIds.map((id) => getSpecialtyTitle(id)).join(", ")}
        </p>
      )}
    </Field>
  );
};

export default MultiSpecialtySelect;
