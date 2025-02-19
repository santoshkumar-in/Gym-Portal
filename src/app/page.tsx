"use client";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/actions/auth";
import { ROLE_BUSINESS, ROLE_ADMIN } from "@/enums";
import BusinessDashboard from "@/components/Dashboards/Business";
import SuperAdminDashboard from "@/components/Dashboards/SuperAdmin";
import UploadProgress from "@/components/common/UploadProgress";

export default function Home() {
  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);
  useEffect(() => {
    async function getUser() {
      const { data } = await getUserDetails();

      if (data?.role === ROLE_ADMIN) {
        setCurrentComponent(<SuperAdminDashboard />);
      } else if (data?.role === ROLE_BUSINESS) {
        setCurrentComponent(
          <BusinessDashboard businessId={data?.businessId} />,
        );
      }
    }
    getUser();
  }, []);
  return (
    <>
      {currentComponent}
      <UploadProgress />
    </>
  );
}
