
"use client";
import { useState, useEffect } from "react";
import { addOrUpdateUser, getSingleOperator } from "@/actions/business";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { BUSINESS_USER } from "@/types/business";
import { ROLE_OPERATOR } from "@/enums";
import { toastSuccess, toastError } from "@/helpers/toast";
import { useRouter } from "next/navigation";



interface Props {
  businessId: string;
  userId?: string;
}

const UserForm = ({ businessId, userId = "" }: Props) => {
  const [selectedUser, setSelectedUser] = useState<BUSINESS_USER>(
    {} as BUSINESS_USER
  );
  const router = useRouter();


  const fetchSingleUser = async () => {
    if (userId) {
      try {
        const { data } = await getSingleOperator(userId);
        if (data) {
          setSelectedUser(data);
        }
      } catch (error) {
        console.log(error);
        toastError("Failed to fetch user details");
      }
    } else {
      setSelectedUser({} as BUSINESS_USER);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [userId]);

  const handleFormSubmit = async (formData: FormData) => {
    // console.log(formData)
    const res = await addOrUpdateUser(formData);
    const { success } = res;
    if (success) {
      toastSuccess(userId ? "Operator updated successfully" : "Operator added successfully");
      // fetchSingleUser();
      router.back();
    } else {
      toastError(userId ? "Operator update failed" : "Operator creation failed");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {/* {userId ? "Edit Details" : "Add Operator"} */}
          Add/Edit Details
        </h3>
      </div>
      <form action={handleFormSubmit}>
        <input type="hidden" name="businessId" value={businessId} />
        <input type="hidden" name="role" value={ROLE_OPERATOR} />
        {userId && <input type="hidden" name="userId" value={userId} />}
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-2/5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                defaultValue={selectedUser?.fullName || ""}
                placeholder="Full Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-2/5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Username
              </label>
              <input
                name="userName"
                type="text"
                defaultValue={selectedUser?.userName || ""}
                placeholder="Username"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </label>
              <SwitcherThree
                name="status"
                defaultChecked={selectedUser?.status === "ACTIVE"}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                name="email"
                type="email"
                defaultValue={selectedUser?.email || ""}
                placeholder="Email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mobile
              </label>
              <input
                name="mobile"
                type="number"
                defaultValue={selectedUser?.mobile || ""}
                placeholder="Mobile"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="flex">
            <button className="rounded bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90">
              Cancel
            </button>
            <button
              type="submit"
              className="ml-auto rounded bg-primary px-10 py-4 font-medium text-gray hover:bg-opacity-90"
            >
              {userId ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;


