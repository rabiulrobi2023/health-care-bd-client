import SpecialtiesMangementHeader from "@/components/modules/admin/SpecialtiesManagement/SpecialtiesMangementHeader";
import SpecialitiesTable from "@/components/modules/admin/SpecialtiesManagement/SpecialtiesTable";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { specialtiesService } from "@/services/admin/specialtiesManagement";

import { Suspense } from "react";

const SpecialtiesManagementPage = async () => {
  const specialties = await specialtiesService.getAllSpecialties();
  return (
    <div className="space-y-6">
      <SpecialtiesMangementHeader />
      <Suspense fallback={<TableSkeleton columns={2} rows={10}/>}>
        <SpecialitiesTable specialities={specialties.data} />
      </Suspense>
    </div>
  );
};

export default SpecialtiesManagementPage;
