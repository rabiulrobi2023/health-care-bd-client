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
    if (state.onSuccess) {
      toast.success(state.message);
      onSuccess();
      onClose();
    }
  }, [state, onSuccess, onClose]);

  return (
    <div>
      <Dialog>
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
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorFormDialog;
