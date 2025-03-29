
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserForm from "@/components/Business/Forms/User";

interface Props {
  params: Promise<{ businessId: string; userId: string }>;
}

const UpdateUser = ({ params }: Props) => {
  const { businessId, userId } = use(params);
  const router = useRouter();

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <div className="flex">
          <a className="mb-2 cursor-pointer font-medium" onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowRotateLeft} /> Back
          </a>
        </div>

        {/* Pass businessId & userId to UserForm */}
        <UserForm userId={userId} businessId={businessId} />
      </div>
    </DefaultLayout>
  );
};

export default UpdateUser;
