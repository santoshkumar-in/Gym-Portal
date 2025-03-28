"use client";
import { useState, useEffect } from "react";
const AllSubscriptions = ({
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

  return <h2>All Subscriptions of {businessId}</h2>;
};

export default AllSubscriptions;
