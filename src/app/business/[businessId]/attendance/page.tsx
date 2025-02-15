"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Pagination from "@/components/Pagination";
import { getAttendance } from "@/actions/business";
import { ATTENDANCE } from "@/types/business";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/ReactSelectMultiSelect";

const SubscriberAttendance = ({
  params,
}: {
  params: Promise<{ businessId: string; subscriberId: string }>;
}) => {
  const [businessId, setBusinessId] = useState<string>("");
  const [attendance, setAttendance] = useState<ATTENDANCE[]>([]);

  useEffect(() => {
    async function getData() {
      const bId = (await params).businessId;
      setBusinessId(bId);
      const { data = [] } = await getAttendance(bId);
      setAttendance(data);
    }
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className="mb-4 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="flex items-center justify-between pb-5">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
              type="text"
              className="min-w-75 rounded-md border border-stroke px-5 py-2 pl-12 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Search..."
              value=""
            />
          </div>
          <div className="flex items-center font-medium">
            <DatePickerOne containerClass="mr-2" className="py-2" />
            <DatePickerOne containerClass="mr-2" className="py-2" />
            <MultiSelect />
            <button className="ml-2 rounded bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90">
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <Link
              href={`/business/${businessId}/attendance/add`}
              className="ml-2 rounded bg-secondary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
            >
              <FontAwesomeIcon icon={faCirclePlus} />
            </Link>
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
      <div className="mt-4 flex items-center justify-center rounded-sm border border-gray-100 bg-white px-5 py-3 shadow-default dark:border-gray-800 dark:bg-boxdark sm:px-7.5 sm:py-3">
        <Pagination />
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
    </DefaultLayout>
  );
};

export default SubscriberAttendance;
