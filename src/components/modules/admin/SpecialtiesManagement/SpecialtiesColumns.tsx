import { TColumn } from "@/components/shared/ManagementTable";
import { TSpecialty } from "./specialty.interface";
import Image from "next/image";

export const SpecialtiesColumns: TColumn<TSpecialty>[] = [
  {
    header: "Icon",
    accessor: (speciality) => (
      <Image
        src={speciality.icon}
        alt={speciality.title}
        width={40}
        height={40}
      />
    ),
  },
  {
    header: "Title",
    accessor: (specialty) => specialty.title,
  },
];
