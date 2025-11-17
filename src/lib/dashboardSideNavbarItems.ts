import { TDashboardSideNavSection, TUserRole } from "@/types/types";
import { getDefaultDashboard } from "./auth-utils";
import { adminBaseRoute, patientBaseRotue, UserRoles } from "@/const/const";

export const getCommonNavSection = (
  role: TUserRole
): TDashboardSideNavSection[] => {
  const defaultDashboard = getDefaultDashboard(role);
  const roles = Object.values(UserRoles);

  return [
    {
      items: [
        {
          title: "Dashboard",
          icon: "LayoutDashboard",
          href: defaultDashboard,

          roles: roles,
        },
        {
          title: "My Profile",
          icon: "Settings",
          href: "/my-profile",
          roles: roles,
        },
      ],
    },
  ];
};

const doctorBaseroute = "/doctor/dashboard";
export const doctorNavSection: TDashboardSideNavSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "Appoinments",
        href: `${doctorBaseroute}/appointments`,
        icon: "Calendar1Icon",
        badge: 3,
        roles: [UserRoles.DOCTOR],
      },
      {
        title: "My Schedules",
        href: `${doctorBaseroute}/my-schdule`,
        icon: "Clock9",
        roles: [UserRoles.DOCTOR],
      },
      {
        title: "Prescriptions",
        href: `${doctorBaseroute}/prescriptions`,
        icon: "NotebookPenIcon",
        roles: [UserRoles.DOCTOR],
      },
    ],
  },
];

export const patientNavSection: TDashboardSideNavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointment",
        href: `${patientBaseRotue}/my-appointments`,
        roles: [UserRoles.PATIENT],
      },
      {
        title: "Book Appointment",
        href: `${patientBaseRotue}/consultation`,
        roles: [UserRoles.PATIENT],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: `${patientBaseRotue}/my-prescriptions`,
        roles: [UserRoles.PATIENT],
      },
      {
        title: "Health Record",
        href: `${patientBaseRotue}/health-records`,
        roles: [UserRoles.PATIENT],
      },
    ],
  },
];

export const adminNavSection: TDashboardSideNavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: `${adminBaseRoute}/admins-management`,
        icon:"Users",
        roles: [UserRoles.ADMIN],
      },
      {
        title: "Doctors",
        href: `${adminBaseRoute}/doctors-management`,
        icon: "Stethoscope",
        roles: [UserRoles.ADMIN],
      },
      {
        title: "Patients",
        href: `${adminBaseRoute}/patients-management`,
        icon:"Users",
        roles: [UserRoles.ADMIN],
      },
    ],
  },
  {
    title: "Hospital",
    items: [
      {
        title: "Appointments",
        href: `${adminBaseRoute}/appointments-management`,
        icon:"Calendar1",
        roles: [UserRoles.ADMIN],
      },
      {
        title: "Schedules",
        href: `${adminBaseRoute}/schedules-management`,
        icon:"Clock8",
        roles: [UserRoles.ADMIN],
      },
      {
        title: "Specialties",
        href: `${adminBaseRoute}/specialties-management`,
        icon:"Hospital",
        roles: [UserRoles.ADMIN],
      },
    ],
  },
];

export const getDashboardSideNavSection = (
  role: TUserRole
): TDashboardSideNavSection[] => {
  const commonNavSection = getCommonNavSection(role);
  switch (role) {
    case UserRoles.ADMIN:
      return [...commonNavSection, ...adminNavSection];

    case UserRoles.DOCTOR:
      return [...commonNavSection, ...doctorNavSection];

    case UserRoles.PATIENT:
      return [...commonNavSection, ...patientNavSection];
    default:
      return [];
  }
};
