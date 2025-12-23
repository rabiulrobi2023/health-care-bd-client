import DoctorManagementHeader from "@/components/modules/admin/DoctorManagement/DoctorManagementHeader";
import { TSpecialty } from "@/components/modules/admin/SpecialtiesManagement/specialty.interface";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSkeleton from "@/components/shared/TableSkeleton";

import { specialtiesService } from "@/services/admin/specialtiesManagement";
import { Suspense } from "react";

const DcoctorManagementPage = async () => {
  const specialtes = await specialtiesService.getAllSpecialties();

  return (
    <div>
      <div>
        <DoctorManagementHeader specialties={specialtes} />
        <div className="flex space-x-4 mt-5">
          <SearchFilter paramName="searchTerm" placeholder="Search doctor..." />
          <SelectFilter
            paramName="specialty"
            placeHolder="Select Specialty"
            options={specialtes?.data.map((specialty: TSpecialty) => ({
              label: specialty.title,
              value: specialty.title,
            }))}
          />
          <RefreshButton showLabel={true} />
        </div>
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />} />
    </div>
  );
};

export default DcoctorManagementPage;
