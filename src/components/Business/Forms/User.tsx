"use client";
import { useState, useEffect } from "react";
import { addOrUpdateUser, getAllUsers } from "@/actions/business";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { BUSINESS_USER } from "@/types/business";
interface Props {
  businessId: string;
  userId?: string;
}
const UserForm = ({ businessId, userId = "" }: Props) => {
  const [selectedUser, setSelectedUser] = useState<BUSINESS_USER>(
    {} as BUSINESS_USER,
  );
  useEffect(() => {
    async function getData() {
      const { data: packages = [] } = await getAllUsers(businessId);
      const found = packages.find((p) => p.id === userId);
      if (found) {
        setSelectedUser(found);
      }
    }
    if (userId) {
      getData();
    } else {
      setSelectedUser({
        id: "",
        firstName: "",
        lastName: "",
        mobile: 0,
        email: "",
        password: "",
        confirmPassword: "",
        status: "ACTIVE",
      });
    }
  }, [businessId, userId]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Add/Edit Details
        </h3>
      </div>
      <form action={addOrUpdateUser}>
        <input type="hidden" name="businessId" value={businessId} />
        {userId && <input type="hidden" name="packageId" value={userId} />}
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                defaultValue={selectedUser.firstName}
                placeholder="First name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                defaultValue={selectedUser.lastName}
                placeholder="Last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                defaultValue={selectedUser.email}
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
                type="text"
                defaultValue={selectedUser.mobile}
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
                defaultValue={selectedUser.password}
                placeholder="Email"
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
                defaultValue={selectedUser.confirmPassword}
                placeholder="Confirm Password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Role
              </label>
              <input
                name="role"
                type="text"
                placeholder="Role"
                defaultValue={selectedUser.role}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </label>
              <SwitcherThree
                name="status"
                defaultChecked={selectedUser.status === "ACTIVE"}
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
