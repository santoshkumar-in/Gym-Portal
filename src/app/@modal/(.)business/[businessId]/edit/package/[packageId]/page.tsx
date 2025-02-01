"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PackageForm from "@/components/Business/Forms/Package";
import Modal from "@/components/Modal";
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
    console.log(businessId, packageId);
  }, []);

  return (
    <Modal modalIsOpen={true} className="relative max-w-3xl">
      <button className="absolute right-5 top-10" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <PackageForm />
    </Modal>
  );
};

export default EditPackage;
