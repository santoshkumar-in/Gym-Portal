
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";

import { addOrUpdateUser, getSingleOperator } from "@/actions/business";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { BUSINESS_USER } from "@/types/business";
import { ROLE_OPERATOR } from "@/enums";
import { toastSuccess, toastError } from "@/helpers/toast";
import { UserSchemaError } from "@/types/zod-errors";

interface Props {
  businessId: string;
  userId?: string;
}

const UserForm = ({ businessId, userId = "" }: Props) => {
  const [selectedUser, setSelectedUser] = useState<BUSINESS_USER>({} as BUSINESS_USER);
  const [formErrors, setFormErrors] = useState<UserSchemaError>({} as UserSchemaError);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const fetchSingleUser = async () => {
    if (userId) {
      try {
        const { data } = await getSingleOperator(userId);
        if (data) setSelectedUser(data);
      } catch (error) {
        console.error(error);
        toastError("Failed to fetch user details");
      }
    } else {
      setSelectedUser({} as BUSINESS_USER);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [userId]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({} as UserSchemaError);

    const formData = new FormData(e.currentTarget);
    const res = await addOrUpdateUser(formData);
    console.log("Response datakhushi:", res );
    const { success, errors } = res;

    if (errors || !success) {
      setFormErrors(errors || ({} as UserSchemaError));
      toastError(userId ? "Operator update failed" : "Operator creation failed");
      setIsSubmitting(false);
      return;
    }

    toastSuccess(userId ? "Operator updated successfully" : "Operator added successfully");
    router.back();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add/Edit Details</h3>
      </div>

      <form onSubmit={handleFormSubmit}>
        <input type="hidden" name="businessId" value={businessId} />
        <input type="hidden" name="role" value={ROLE_OPERATOR} />
        {userId && <input type="hidden" name="userId" value={userId} />}

        <div className="p-6.5">
          {/* Full Name, Username, Status */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-2/5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Full Name</label>
              <input
                name="fullName"
                type="text"
                defaultValue={selectedUser?.fullName || ""}
                placeholder="Full Name"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white outline-none focus:border-primary",
                  { "border-red-500": formErrors.fullName, "border-stroke": !formErrors.fullName }
                )}
              />
              {formErrors.fullName && <p className="pt-1 text-xs text-red-500">{formErrors.fullName._errors[0]}</p>}
            </div>

            <div className="w-full xl:w-2/5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Username</label>
              <input
                name="userName"
                type="text"
                defaultValue={selectedUser?.userName || ""}
                placeholder="Username"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white outline-none focus:border-primary",
                  { "border-red-500": formErrors.userName, "border-stroke": !formErrors.userName }
                )}
              />
              {formErrors.userName && <p className="pt-1 text-xs text-red-500">{formErrors.userName._errors[0]}</p>}
            </div>

            <div className="w-full xl:w-1/5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Status</label>
              <SwitcherThree name="status" defaultChecked={selectedUser?.status === "ACTIVE"} />
            </div>
          </div>

          {/* Email & Mobile */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
              <input
                name="email"
                type="text"
                defaultValue={selectedUser?.email || ""}
                placeholder="Email"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white outline-none focus:border-primary",
                  { "border-red-500": formErrors.email, "border-stroke": !formErrors.email }
                )}
              />
              {formErrors.email && <p className="pt-1 text-xs text-red-500">{formErrors.email._errors[0]}</p>}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Mobile</label>
              <input
                name="mobile"
                type="number"
                defaultValue={selectedUser?.mobile || ""}
                placeholder="Mobile"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white outline-none focus:border-primary",
                  { "border-red-500": formErrors.mobile, "border-stroke": !formErrors.mobile }
                )}
              />
              {formErrors.mobile && <p className="pt-1 text-xs text-red-500">{formErrors.mobile._errors[0]}</p>}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white outline-none focus:border-primary",
                  { "border-red-500": formErrors.password, "border-stroke": !formErrors.password }
                )}
              />
              {formErrors.password && <p className="pt-1 text-xs text-red-500">{formErrors.password._errors[0]}</p>}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white outline-none focus:border-primary",
                  { "border-red-500": formErrors.confirmPassword, "border-stroke": !formErrors.confirmPassword }
                )}
              />
              {formErrors.confirmPassword && (
                <p className="pt-1 text-xs text-red-500">{formErrors.confirmPassword._errors[0]}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                if (isSubmitting) return;
                setFormErrors({} as UserSchemaError);
                router.back();
              }}
              disabled={isSubmitting}
              className={cn(
                "rounded bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90",
                { "opacity-50 cursor-not-allowed": isSubmitting }
              )}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "ml-auto rounded bg-primary px-10 py-4 font-medium text-gray hover:bg-opacity-90",
                { "opacity-50 cursor-not-allowed": isSubmitting }
              )}
            >
              {isSubmitting
                ? userId
                  ? "Updating..."
                  : "Submitting..."
                : userId
                ? "Update"
                : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

