"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Calender from "@/components/Calender/BusinessCalender";

const BusinessCalender = ({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) => {
  const [businessId, setBusinessId] = useState<string>("");

  useEffect(() => {
    async function getParams() {
      const bId = (await params).businessId;
      setBusinessId(bId);
    }
    getParams();
    console.log(businessId);
  }, []);
  return (
    <DefaultLayout>
      <Calender />
    </DefaultLayout>
  );
};

export default BusinessCalender;
