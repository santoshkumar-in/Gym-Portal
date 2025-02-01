"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

const EditBasicInfo = ({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) => {
  const [businessId, setBusinessId] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    async function getParams() {
      const bId = (await params).businessId;
      setBusinessId(bId);
    }
    getParams();
  }, []);
  return (
    <Modal modalIsOpen={true}>
      <div className="mx-auto max-w-242.5">
        <h4>Edit Basic info of {businessId}</h4>
        <button onClick={() => router.back()}>close</button>
      </div>
    </Modal>
  );
};

export default EditBasicInfo;
