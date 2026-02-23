import DoctorManagementHeader from "@/components/modules/admin/DoctorManagement/DoctorManagementHeader";
import DoctorManagementTable from "@/components/modules/admin/DoctorManagement/DoctorManagementTable";
import { TSpecialty } from "@/components/modules/admin/SpecialtiesManagement/specialty.interface";
import ClearFilterButton from "@/components/shared/ClearFilterButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Gender } from "@/const/const";
import { getQueryString } from "@/lib/formatters";
import { doctorService } from "@/services/admin/doctorManagement";

import { specialtiesService } from "@/services/admin/specialtiesManagement";
import { getUserInfoFromToken } from "@/services/auth/getUserInfoFromToken";
import { TUserInfoFormToken } from "@/types/types";

import { Suspense } from "react";

const DcoctorManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryObj = await searchParams;
  const queryString = getQueryString(queryObj);

  const doctor = await doctorService.getAllDoctros(queryString);
  console.log(doctor)

  const metaData = {
    currentPage: doctor?.data?.meta?.page,
    totalPage: doctor?.data?.meta?.totalPage,
    maxPage: 5,
    limit: doctor?.data?.meta?.limit,
  };

  const specialtes = await specialtiesService.getAllSpecialties();
  const userInfo = (await getUserInfoFromToken()) as TUserInfoFormToken;
  const specialtiesData = await specialtes.data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <DoctorManagementHeader specialties={specialtes.data || []} />
        <div className="flex space-x-4 mt-5">
          <SearchFilter paramName="searchTerm" placeholder="Search doctor..." />
          <SelectFilter
            paramName="specialties"
            placeholder="Specialty"
            defaultValue="All Specialties"
            options={specialtes?.data.map((specialty: TSpecialty) => ({
              label: specialty.title,
              value: specialty.title,
            }))}
          />
          <SelectFilter
            paramName="gender"
            placeholder="Specialty"
            defaultValue="All Gender"
            options={Object.keys(Gender)?.map((gen) => ({
              label: gen,
              value: gen,
            }))}
          />

          <ClearFilterButton />
          <RefreshButton showLabel={true} />
        </div>
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <DoctorManagementTable
          doctor={doctor?.data?.data}
          specialties={specialtiesData}
          userInfo={userInfo}
        />
        <TablePagination
          currentPage={metaData.currentPage}
          totalpage={metaData.totalPage}
          maxPage={metaData.maxPage}
          limit={metaData.limit}
        />
      </Suspense>
    </div>
  );
};

export default DcoctorManagementPage;
