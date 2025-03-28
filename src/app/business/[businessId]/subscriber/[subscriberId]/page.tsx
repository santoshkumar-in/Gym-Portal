"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import classnames from "classnames";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  getSubscribers,
  getUserSubscriptions,
  getUserAttendance,
} from "@/actions/business";
import {
  SUBSCRIBER,
  SUBSCRIPTION,
  SUBSCRIBER_ATTENDANCE,
} from "@/types/business";

const SubscriberDetailPage = ({
  params,
}: {
  params: Promise<{ businessId: string; subscriberId: string }>;
}) => {
  const [businessId, setBusinessId] = useState<string>("");
  const [subscriber, setSubscriber] = useState<SUBSCRIBER>({} as SUBSCRIBER);
  const [subscriptions, setSubscriptions] = useState<SUBSCRIPTION[]>([]);
  const [attendance, setAttendance] = useState<SUBSCRIBER_ATTENDANCE[]>([]);
  useEffect(() => {
    async function getData() {
      const bId = (await params).businessId;
      setBusinessId(bId);
      const subId = (await params).subscriberId;
      const { data = [] } = await getSubscribers(bId);
      const res = data.find(({ id }) => {
        return id === subId;
      });
      if (res) {
        setSubscriber(res);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const bId = (await params).businessId;
      const subId = (await params).subscriberId;
      const { data = [] } = await getUserSubscriptions(subId, bId);
      setSubscriptions(data);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const bId = (await params).businessId;
      const subId = (await params).subscriberId;
      const { data = [] } = await getUserAttendance(subId, bId);
      setAttendance(data);
    }
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className="rounded-2xl border border-gray-300 p-5 dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {subscriber.name}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Mobile
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {subscriber.mobile}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Gender
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {subscriber.gender}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {subscriber.mobile}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Height/Weight
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  NA
                </p>
              </div>
            </div>
          </div>
          <button className="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              ></path>
            </svg>
            Edit
          </button>
        </div>
      </div>
      <div className="mt-3 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex items-center">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              All Subscriptions (Programmatic Soft)
            </h4>
            <Link
              href={`/business/${businessId}/subscription/new`}
              className="ml-auto rounded bg-primary px-5 py-2.5 text-center font-medium text-white hover:bg-opacity-90"
            >
              Add New
            </Link>
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Status
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Subscription
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Remaining (In days)
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Validity (In days)
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Start date
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <span
                      className={classnames(
                        "w-33 rounded p-2 text-xs text-white dark:text-white",
                        {
                          "bg-warning": subscription.status === "EXPIRED",
                          "bg-success": subscription.status === "ACTIVE",
                        },
                      )}
                    >
                      {subscription.status}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {subscription.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {`${subscription.consumed}/${subscription.total}`}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {subscription.validity}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {subscription.price}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {subscription.startDate}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {subscription.endDate}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Attendance (Programmatic Soft)
          </h4>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
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

export default SubscriberDetailPage;
