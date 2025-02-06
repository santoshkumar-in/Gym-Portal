"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal";
import BasicInfoForm from "@/components/Business/Forms/BusinessInfo/BusinessInfoInner";

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
    console.log(businessId);
  }, []);
  return (
    <Modal modalIsOpen={true} className="relative max-w-3xl">
      <button className="absolute right-5 top-10" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <BasicInfoForm />
    </Modal>
  );
};

export default EditBasicInfo;
