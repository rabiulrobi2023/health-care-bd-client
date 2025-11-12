import {
  CalendarCheckIcon,
  StarsIcon,
  User2Icon,
  UserCheck2,
  UserPenIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../ui/button";
import Link from "next/link";

const HeroLeftContent = () => {
  return (
    <div className="flex flex-col justify-center space-y-6">
      {/* Heading */}
      <h1 className="text-gray-700 text-4xl font-bold">
        Your Health, Our Priority
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-xl">
        Book appointments with top doctors in Bangladesh. Easy registration,
        quick booking, and quality healthcare at your fingertips.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href={"/register"}>
          {" "}
          <Button
            size="lg"
            className="bg-[rgb(7,180,7)] hover:bg-[rgb(6,150,6)] text-white"
          >
            <UserCheck2 />
            Register as Patient
          </Button>
        </Link>

        <Button
          size="lg"
          variant="outline"
          className="border-2 border-[rgb(7,180,7)] text-[rgb(7,180,7)] hover:bg-[rgb(7,180,7)] hover:text-white"
        >
          <CalendarCheckIcon />
          Book Appointment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1 text-green-600 ">
            <User2Icon />
            <span className="text-gray-900">5000+</span>
          </div>
          <span className="text-gray-600 text-sm">Patient Served</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <UserPenIcon />
            <span className="text-gray-900">200+</span>
          </div>
          <span className="text-gray-600 text-sm">Expert Doctors</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1 text-orange-400">
            <StarsIcon />
            <span className="text-gray-900">4.8</span>
          </div>
          <span className="text-gray-600 text-sm">Patient Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default HeroLeftContent;
