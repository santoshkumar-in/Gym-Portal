"use client";
//import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Props {
  params: Promise<{ businessId: string; packageId: string }>;
}
const EditPackage = ({ params }: Props) => {
  const [businessId, setBusinessId] = useState<string>("");
  const [packageId, setPackageId] = useState<string>("");
  //const router = useRouter();
  useEffect(() => {
    async function getParams() {
      const { businessId: bId, packageId: pId } = await params;
      setBusinessId(bId);
      setPackageId(pId);
    }
    getParams();
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <h4>
          Edit Basic info of {businessId} : {packageId}
          {/* <button onClick={() => router.back()}>close</button> */}
        </h4>
      </div>
    </DefaultLayout>
  );
};

export default EditPackage;
