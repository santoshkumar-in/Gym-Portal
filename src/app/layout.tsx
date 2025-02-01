"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FitNxtRootLayout from "@/components/Layouts/RootLayout";

import { getUserDetails } from "@/actions/auth";

export default function RootLayout({
  business,
  super_admin,
  children,
  modal,
}: Readonly<{
  business: React.ReactNode;
  super_admin: React.ReactNode;
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const path = usePathname();
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);

  useEffect(() => {
    async function getUser() {
      const { role } = await getUserDetails();
      setCurrentRole(role);
    }
    getUser();
  }, []);

  useEffect(() => {
    console.log("current path", path);
    if (path !== "/") {
      setCurrentComponent(null);
    } else {
      if (currentRole === "ROLE_BUSINESS") {
        console.log("ROLE_BUSINESS");
        setCurrentComponent(business);
      } else if (currentRole === "ROLE_SUPER") {
        console.log("ROLE_SUPER");
        setCurrentComponent(super_admin);
      }
    }
  }, [path, currentRole]);

  return (
    <FitNxtRootLayout>
      {currentComponent}
      {!currentComponent && children}
      {modal}
    </FitNxtRootLayout>
  );
}
