"use client";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/actions/auth";
import BusinessDashboard from "@/components/Dashboards/Business";
import SuperAdminDashboard from "@/components/Dashboards/SuperAdmin";

export default function Home() {
  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);
  useEffect(() => {
    async function getUser() {
      const { data } = await getUserDetails();
      const { role = "" } = data;
      if (role === "ROLE_SUPER") {
        setCurrentComponent(<SuperAdminDashboard />);
      } else if (role === "ROLE_BUSINESS") {
        setCurrentComponent(<BusinessDashboard />);
      }
    }
    getUser();
  }, []);
  return currentComponent;
}
