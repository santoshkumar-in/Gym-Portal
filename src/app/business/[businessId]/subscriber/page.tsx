"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getSubscribers } from "@/actions/business";
import { SUBSCRIBER } from "@/types/business";
import Subscribers from "@/components/Business/Subscribers";

const BusinessSubscribers = ({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) => {
  const [businessId, setBusinessId] = useState<string>("");
  const [subscribers, setSubscribers] = useState<SUBSCRIBER[]>([]);

  useEffect(() => {
    async function getData() {
      const bId = (await params).businessId;
      setBusinessId(bId);
      const { data } = await getSubscribers(bId);
      setSubscribers(data);
    }
    getData();
  }, []);
  return (
    <DefaultLayout>
      <div className="mb-4 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div className="w-100">
            <input
              type="text"
              className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Search..."
              value=""
            />
          </div>
          <div className="flex items-center font-medium">
            <select className="mr-2 w-full appearance-none rounded border border-stroke bg-transparent px-4 py-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option
                value=""
                disabled
                className="text-body dark:text-bodydark"
              >
                Select Gender
              </option>

              <option value="M" className="text-body dark:text-bodydark">
                Male
              </option>
              <option value="F" className="text-body dark:text-bodydark">
                Female
              </option>
            </select>
            <select className="w-full appearance-none rounded border border-stroke bg-transparent px-4 py-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option
                value=""
                disabled
                className="text-body dark:text-bodydark"
              >
                Select Package
              </option>
              <option
                value="marketing"
                className="text-body dark:text-bodydark"
              >
                Package 1
              </option>
              <option value="template" className="text-body dark:text-bodydark">
                Package 2
              </option>
              <option
                value="development"
                className="text-body dark:text-bodydark"
              >
                Package 3
              </option>
            </select>
            <button className="ml-2 rounded bg-primary px-5 py-2.5 text-center font-medium text-white hover:bg-opacity-90">
              Filter
            </button>
            <button className="ml-2 rounded bg-secondary px-5 py-2.5 text-center font-medium text-white hover:bg-opacity-90">
              Add New
            </button>
          </div>
        </div>
      </div>
      <Subscribers subscribers={subscribers} businessId={businessId} />
      <div className="mt-4 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div className="ml-auto flex items-center font-medium">
            <select className="w-20 bg-transparent pl-2">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BusinessSubscribers;
