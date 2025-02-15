"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserForm from "@/components/Business/Forms/User";

interface Props {
  params: Promise<{ businessId: string; packageId: string }>;
}
const AddUser = ({ params }: Props) => {
  const [businessId, setBusinessId] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    async function getParams() {
      const { businessId: bId } = await params;
      setBusinessId(bId);
    }
    getParams();
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <div className="flex">
          <a
            className="mb-2 cursor-pointer font-medium"
            onClick={() => router.back()}
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} /> Back
          </a>
        </div>
        <UserForm businessId={businessId} />
      </div>
    </DefaultLayout>
  );
};

export default AddUser;
