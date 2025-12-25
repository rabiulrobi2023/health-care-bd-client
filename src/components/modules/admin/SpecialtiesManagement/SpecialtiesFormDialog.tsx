"use client";
import InputFieldErrorMessage from "@/components/shared/InputFieldErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { specialtiesService } from "@/services/admin/specialtiesManagement";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

type TSpecialtiesFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const SpecialtiesFormDialog = ({
  open,
  onClose,
  onSuccess,
}: TSpecialtiesFormDialogProps) => {
  const hasHandledRef = useRef(false);
  const [state, formAction, pending] = useActionState(
    specialtiesService.createSpecialties,
    null
  );


  useEffect(() => {
    if (!state) return;
    if (state.success && !hasHandledRef.current) {
      hasHandledRef.current = true;
      toast.success(state.message);
      onClose();
      onSuccess();
    }

    if (!state.success && !hasHandledRef.current) {
      hasHandledRef.current = true;
      toast.error(state.message);
    }
  }, [state, onClose, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Specialties</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4" action={formAction}>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input type="text" name="title" placeholder="Cardiology" />
            <InputFieldErrorMessage field="title" state={state} />
          </Field>
          <Field>
            <FieldLabel htmlFor="file">Upload Icon</FieldLabel>
            <Input
              type="file"
              name="file"
              placeholder="Cardiology"
              accept="image/*"
            />
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={pending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{pending ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialtiesFormDialog;
