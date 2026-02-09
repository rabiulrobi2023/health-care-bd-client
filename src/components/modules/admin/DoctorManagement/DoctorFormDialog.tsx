"use client";
import { IDoctor } from "@/interface/doctor.interface";
import { TSpecialty } from "../SpecialtiesManagement/specialty.interface";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { TGender } from "@/interface/share.interface";
import { Gender, UserRoles } from "@/const/const";
import { doctorService } from "@/services/admin/doctorManagement";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldErrorMessage from "@/components/shared/InputFieldErrorMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TUserInfoFormToken } from "@/types/types";
import { useSpecialtySelection } from "@/hooks/useSpecialtySelection";
import MultiSpecialtySelect from "./MultiSpecialtySelect";
import Image from "next/image";

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: IDoctor;
  specialties?: TSpecialty[];
  userInfo?: TUserInfoFormToken;
}

const DoctorFormDialog = ({
  open,
  onClose,
  onSuccess,
  doctor,
  specialties,
}: IDoctorFormDialogProps) => {
  const isUpdate = !!doctor;
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [gender, setGender] = useState<TGender | undefined>(
    () => doctor?.gender,
  );

  const [selectFile, setSelectfile] = useState<File | null>(null);

  const [state, formAction, pending] = useActionState(
    isUpdate
      ? doctorService.updateDoctor.bind(null, doctor.id!)
      : doctorService.createDoctor,
    null,
  );

  const specialtiesSelection = useSpecialtySelection({
    doctor,
    isUpdate,
    open,
  });
  const {
    currentSpecialtyId,
    getAvailableSpecialties,
    getNewSpecialties,
    handleAddSpecialty,
    handleRemoveSpecialty,
    removedSpecialties,
    selectedSpecialtyIds,
    setCurrentSpecialtyId,
  } = specialtiesSelection;

  const getSpecialtyTitle = (id: string) => {
    return specialties?.find((s) => s.id === id)?.title || "Unkonown";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files?.[0];
      setSelectfile(file || null);
    }
  };

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (selectFile) {
      setSelectfile(null);
    }
    formRef.current?.reset();
    onClose();
  };

  const prevSuccessRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (state?.success && prevSuccessRef.current !== true) {
      toast.success("Doctor updated successfully");

      formRef.current?.reset();
      onSuccess();
      onClose();
    }

    if (state && state.success === false && prevSuccessRef.current !== false) {
      toast.error(state.message || "Something went wrong");

      if (selectFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }

    prevSuccessRef.current = state?.success ?? null;
  }, [state?.success, onClose, onSuccess, state, selectFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl text-center">
            {isUpdate ? "Edit Doctor" : "Create a New Doctor"}
          </DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="flex flex-col gap-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. Rabiul Islam"
                defaultValue={
                  state?.formData?.name || (isUpdate ? doctor?.name : "")
                }
              />
              <InputFieldErrorMessage field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                placeholder="example@mail.com"
                defaultValue={
                  state?.formData?.email || (isUpdate ? doctor?.email : "")
                }
                disabled={isUpdate}
              />
              <InputFieldErrorMessage field="email" state={state} />
            </Field>

            <MultiSpecialtySelect
              selectedSpecialtyIds={selectedSpecialtyIds}
              removedSpecialtyIds={removedSpecialties}
              currentSpecialtyId={currentSpecialtyId}
              availableSpecialties={getAvailableSpecialties(specialties || [])}
              isEdit={isUpdate}
              onCurrentSpecialtyChange={setCurrentSpecialtyId}
              onAddSpecialty={handleAddSpecialty}
              onRemoveSpecialty={handleRemoveSpecialty}
              getSpecialtyTitle={getSpecialtyTitle}
              getNewSpecialtes={getNewSpecialties}
            />
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="017504589754"
                defaultValue={
                  state?.formData?.contactNumber ||
                  (isUpdate ? doctor?.contactNumber : "")
                }
              />
              <InputFieldErrorMessage state={state} field="contactNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                defaultValue={
                  state?.formData?.address ||
                  (isUpdate ? doctor?.address : undefined)
                }
              />
              <InputFieldErrorMessage field="address" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="registrationNumber">
                Registration Number
              </FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
                defaultValue={
                  state?.formData?.registrationNumber ||
                  (isUpdate ? doctor?.registrationNumber : "")
                }
              />
              <InputFieldErrorMessage
                state={state}
                field="registrationNumber"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="experience">
                Experience (in years)
              </FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                defaultValue={
                  state?.formData?.experience ||
                  (isUpdate ? doctor?.experience : undefined)
                }
                min="0"
              />
              <InputFieldErrorMessage state={state} field="experience" />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>

              <Input
                id="gender"
                name="gender"
                type="hidden"
                value={gender ?? doctor?.gender ?? ""}
              />

              <Select
                value={gender ?? doctor?.gender}
                onValueChange={(value) => setGender(value as TGender)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>

                <SelectContent>
                  {Object.keys(Gender).map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <InputFieldErrorMessage field="gender" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="appoinmentFee">Appointment Fee</FieldLabel>
              <Input
                id="appoinmentFee"
                name="appoinmentFee"
                type="number"
                placeholder="100"
                defaultValue={
                  state?.formData?.appoinmentFee ||
                  (isUpdate ? doctor?.appoinmentFee : "")
                }
                min="0"
              />
              <InputFieldErrorMessage state={state} field="appoinmentFee" />
            </Field>

            <Field>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                defaultValue={
                  state?.formData?.qualification ||
                  (isUpdate ? doctor?.qualification : "")
                }
              />
              <InputFieldErrorMessage state={state} field="qualification" />
            </Field>

            <Field>
              <FieldLabel htmlFor="currentWorkingPlace">
                Current Working Place
              </FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
                defaultValue={
                  state?.formData?.currentWorkingPlace ||
                  (isUpdate ? doctor?.currentWorkingPlace : "")
                }
              />
              <InputFieldErrorMessage
                state={state}
                field="currentWorkingPlace"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
                defaultValue={
                  state?.formData?.designation ||
                  (isUpdate ? doctor?.designation : "")
                }
              />
              <InputFieldErrorMessage state={state} field="designation" />
            </Field>

            {!isUpdate && (
              <div className="flex gap-4">
                <Field className="">
                  <FieldLabel htmlFor="profilePhoto">Photo</FieldLabel>
                  <Input
                    ref={fileInputRef}
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    // defaultValue={isUpdate? doctor.profilePhoto:""}
                  />
                  <InputFieldErrorMessage state={state} field="profilePhoto" />
                </Field>

                <div className="flex mx-auto">
                  {selectFile && (
                    <Image
                      src={
                        typeof selectFile === "string"
                          ? selectFile
                          : URL.createObjectURL(selectFile)
                      }
                      alt="Profile Photo Preview"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
            )}

            <div className=" flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={pending}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={pending}>
                {pending ? "Saving..." : isUpdate ? "Update" : "Create"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFormDialog;
