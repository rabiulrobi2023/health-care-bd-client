"use client";
import { TDoctor } from "@/interface/doctor.interface";
import { TSpecialty } from "../SpecialtiesManagement/specialty.interface";
import { useActionState, useEffect, useState } from "react";
import { TGender } from "@/interface/share.interface";
import { Gender } from "@/const/const";
import { doctorService } from "@/services/admin/doctorManagement";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
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

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: TDoctor;
  specialties?: TSpecialty[];
}

const DoctorFormDialog = ({
  open,
  onClose,
  onSuccess,
  doctor,
  specialties,
}: IDoctorFormDialogProps) => {
  const isUpdate = !!doctor;
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [gender, setGender] = useState<TGender>(
    isUpdate ? doctor?.gender : Gender.MALE
  );
  const [state, formAction, pending] = useActionState(
    isUpdate
      ? doctorService.updateDoctor.bind(null, doctor.id!)
      : doctorService.createDoctor,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? "Edit Doctor" : "Create a New Doctor"}
            </DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. Rabiul Islam"
                defaultValue={isUpdate ? doctor.name : undefined}
              />
              <InputFieldErrorMessage field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                placeholder="example@mail.com"
                defaultValue={isUpdate ? doctor.email : undefined}
              />
              <InputFieldErrorMessage field="email" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="specialty">Specialty</FieldLabel>
              <Input
                id="specialty"
                name="specialty"
                placeholder={selectedSpecialty}
                type="hidden"
              />
              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties && specialties.length > 0 ? (
                    specialties.map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.title}>
                        {specialty.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none">
                      No specialties available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <InputFieldErrorMessage field="specialty" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="017504589754"
                defaultValue={isUpdate ? doctor?.contactNumber : undefined}
              />
              <InputFieldErrorMessage state={state} field="contactNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                defaultValue={isUpdate ? doctor?.address : undefined}
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
                defaultValue={isUpdate ? doctor?.registrationNumber : undefined}
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
                defaultValue={isUpdate ? doctor?.experience : undefined}
                min="0"
              />
              <InputFieldErrorMessage state={state} field="experience" />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Input
                id=""
                name="gender"
                type="hidden"
                placeholder="Select Geender"
                defaultValue={isUpdate ? doctor.gender : Gender.MALE}
              />
              <Select
                value={gender}
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
              <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
              <Input
                id="appointmentFee"
                name="appointmentFee"
                type="number"
                placeholder="100"
                defaultValue={isUpdate ? doctor?.appointmentFee : undefined}
                min="0"
              />
              <InputFieldErrorMessage state={state} field="appointmentFee" />
            </Field>

            <Field>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                defaultValue={isUpdate ? doctor?.qualification : undefined}
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
                  isUpdate ? doctor?.currentWorkingPlace : undefined
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
                defaultValue={isUpdate ? doctor?.designation : undefined}
              />
              <InputFieldErrorMessage state={state} field="designation" />
            </Field>

            {isUpdate && (
              <Field>
                <FieldLabel htmlFor="profilePhoto">Profile Photo</FieldLabel>
                <Input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                />
                <InputFieldErrorMessage state={state} field="profilePhoto" />
              </Field>
            )}

            <div className=" flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={pending}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={pending}>
                {pending ? "Saving..." : isUpdate ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorFormDialog;
