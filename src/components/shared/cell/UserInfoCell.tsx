"use client";

import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/formatters";
import Image from "next/image";

interface IUserInfoCellProps {
  name: string;
  email: string;
  photo?: string | null;
}

const UserInfoCell = ({ name, email, photo }: IUserInfoCellProps) => {
  return (
    <div className="w-[200px]">
      <Avatar className="border-green-500 border-2 w-15 h-15">
        {photo ? (
          <Image src={photo} alt={name} width={90} height={90} />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-bold border-2 rounded-full">
            {getInitials(name)}
          </div>
        )}
      </Avatar>
      <div >
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserInfoCell;
