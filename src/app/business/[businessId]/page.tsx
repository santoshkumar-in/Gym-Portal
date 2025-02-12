"use client";
import { useState, useEffect } from "react";
import Business from "@/components/Business";

const BusinessDetails = ({
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
  }, []);
  return <Business businessId={businessId} />;
};

export default BusinessDetails;
