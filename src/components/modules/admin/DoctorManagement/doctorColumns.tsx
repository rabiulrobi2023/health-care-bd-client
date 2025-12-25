"use client";

import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { TColumn } from "@/components/shared/ManagementTable";
import { TDoctor } from "@/interface/doctor.interface";
import { Star } from "lucide-react";

const doctorColumn: TColumn<TDoctor>[] = [
  {
    header: "Doctor",
    className:"w-[180px]",
    accessor: (doctor) => (
      <UserInfoCell
        name={doctor.name}
        email={doctor.email}
        photo={doctor.profilePhoto}
      />
    ),
  },

  {
    header: "Specialties",
    accessor: (doctor) => (
      <div>
        {doctor?.doctorSpecialtes && doctor.doctorSpecialtes?.length > 0 ? (
          doctor.doctorSpecialtes?.map((specialty, index) => (
            <span key={index}>{specialty.titile}</span>
          ))
        ) : (
          <span>No specialties</span>
        )}
      </div>
    ),
  },

  {
    header: "Contact Number",
    accessor: (doctor) => (
      <div>
        <span>{doctor.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Experience",
    accessor: (doctor) => (
      <div>
        <span>
          {doctor.experience ?? 0} year{doctor.experience > 1 && "s"}
        </span>
      </div>
    ),
  },

  {
    header: "Fee",
    accessor: (doctor) => <span>৳{doctor.appoinmentFee} </span>,
  },
  {
    header: "Rating",
    accessor: (doctor) => (
      <div>
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span>{doctor.rating}</span>
      </div>
    ),
  },
  {
    header: "Gender",
    accessor: (doctor) => (
      <span className="text-sm capitalize">{doctor.gender.toLowerCase()}</span>
    ),
  },
  {
    header: "Status",
    accessor: (doctor) => (
      <StatusBadgeCell
        isDeleted={doctor.isDeleted as boolean}
        activeText="Active"
        deletedText="Deleted"
      />
    ),
  },

  {
    header: "Joining Date",
    accessor: (doctor) => <DateCell date={doctor.createdAt as string | Date} />,
  },
];

export default doctorColumn;
