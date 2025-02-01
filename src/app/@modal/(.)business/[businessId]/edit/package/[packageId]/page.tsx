"use client";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  params: Promise<{ businessId: string; packageId: string }>;
}
const EditPackage = ({ params }: Props) => {
  const [businessId, setBusinessId] = useState<string>("");
  const [packageId, setPackageId] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    async function getParams() {
      const { businessId: bId, packageId: pId } = await params;
      setBusinessId(bId);
      setPackageId(pId);
    }
    getParams();
  }, []);

  return (
    <Modal modalIsOpen={true}>
      <div className="mx-auto max-w-242.5">
        <h4>
          Edit Package info of {businessId} : {packageId}
        </h4>
        <button onClick={() => router.back()}>close</button>
      </div>
    </Modal>
  );
};

export default EditPackage;
