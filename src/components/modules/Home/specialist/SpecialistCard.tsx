import { LucideIcon } from "lucide-react";

interface SpecialistCardProps {
  icon: LucideIcon;
  name: string;
  bgColor: string;
  iconBgColor: string;
}

export function SpecialistCard({
  icon: Icon,
  name,
  bgColor,
  iconBgColor,
}: SpecialistCardProps) {
  return (
    <div
      className={`${bgColor} h-[160px] rounded-[12px] w-full flex flex-col items-center justify-center gap-[16px] px-[24px] m`}
    >
      <div
        className={`${iconBgColor} rounded-[8px] size-[56px] flex items-center justify-center`}
      >
        <Icon className="size-6 text-white" strokeWidth={2} />
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif]  justify-center leading-[0]  text-gray-900 text-center">
        <p className="leading-[32px]">{name}</p>
      </div>
    </div>
  );
}
