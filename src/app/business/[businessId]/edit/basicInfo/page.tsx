"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BasicInfoForm from "@/components/Business/Forms/BusinessInfo";

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
    <DefaultLayout>
      <div className="mx-auto max-w-4xl">
        <div className="flex">
          <a
            className="mb-2 cursor-pointer font-medium"
            onClick={() => router.back()}
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} /> Back
          </a>
        </div>

        <BasicInfoForm businessId={businessId} />
      </div>
    </DefaultLayout>
  );
};

export default EditBasicInfo;
