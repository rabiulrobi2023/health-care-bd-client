import { Baby, Bone, Brain, Eye, Heart, Stethoscope } from "lucide-react";
import { SpecialistCard } from "./SpecialistCard";

export function SpecialistSection() {
  const specialists = [
    {
      icon: Heart,
      name: "Cardiologist",
      bgColor: "bg-red-50",
      iconBgColor: "bg-red-600",
    },
    {
      icon: Brain,
      name: "Neurologist",
      bgColor: "bg-indigo-50",
      iconBgColor: "bg-indigo-600",
    },
    {
      icon: Baby,
      name: "Pediatrician",
      bgColor: "bg-pink-50",
      iconBgColor: "bg-pink-600",
    },
    {
      icon: Stethoscope,
      name: "General Physician",
      bgColor: "bg-teal-50",
      iconBgColor: "bg-teal-600",
    },
    {
      icon: Eye,
      name: "Ophthalmologist",
      bgColor: "bg-amber-50",
      iconBgColor: "bg-amber-600",
    },
    {
      icon: Bone,
      name: "Orthopedist",
      bgColor: "bg-cyan-50",
      iconBgColor: "bg-cyan-600",
    },
  ];

  return (
    <div className="bg-white w-full mx-auto pt-10 container ">
      <div className="flex flex-col mx-auto ">
        <p className="text-2xl font-bold">Our Medical Specialists</p>
        <p className="">Expert doctors across various medical specialties</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 pt-5">
        {specialists.map((specialist, index) => (
          <SpecialistCard
            key={index}
            icon={specialist.icon}
            name={specialist.name}
            bgColor={specialist.bgColor}
            iconBgColor={specialist.iconBgColor}
          />
        ))}
      </div>
    </div>
  );
}
