"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getAttendance } from "@/actions/business";
import { ATTENDANCE } from "@/types/business";

const SubscriberAttendance = ({
  params,
}: {
  params: Promise<{ businessId: string; subscriberId: string }>;
}) => {
  const [attendance, setAttendance] = useState<ATTENDANCE[]>([]);

  useEffect(() => {
    async function getData() {
      const bId = (await params).businessId;
      const { data = [] } = await getAttendance(bId);
      setAttendance(data);
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
      <div className="mt-3 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Mobile
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Subscription
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  In time
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Out time
                </th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((attend, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">{attend.date}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">{attend.name}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {attend.mobile}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {attend.subscription}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {attend.inTime}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {attend.outTime}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SubscriberAttendance;
