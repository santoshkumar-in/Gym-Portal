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
  const [subscribers, setSubscribers] = useState<SUBSCRIBER[]>([]);

  useEffect(() => {
    async function getData() {
      const businessId = (await params).businessId;
      const { data } = await getSubscribers(businessId);
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
            <select className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-400 placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:placeholder:text-white/30">
              <option
                value=""
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Select Gender
              </option>

              <option
                value="M"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Male
              </option>
              <option
                value="F"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Female
              </option>
            </select>
            <select className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 dark:bg-dark-900 ml-2 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-400 placeholder:text-gray-400 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:placeholder:text-white/30">
              <option
                value=""
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Select Package
              </option>
              <option
                value="marketing"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Package 1
              </option>
              <option
                value="template"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Package 2
              </option>
              <option
                value="development"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Package 3
              </option>
            </select>
            <button className="ml-2 rounded bg-primary px-5 py-2.5 text-center font-medium text-white hover:bg-opacity-90">
              Filter
            </button>
          </div>
        </div>
      </div>
      <Subscribers subscribers={subscribers} />
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
