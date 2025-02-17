"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Pagination from "@/components/Pagination";
import Attendance from "@/components/Business/Attendance";
import { getAttendance } from "@/actions/business";
import { ATTENDANCE } from "@/types/business";
import Modal from "@/components/Modal";
import { toastSuccess } from "@/helpers/toast";
import SearchAndFilterBar from "@/components/Business/SearchAndFilter";

const SubscriberAttendance = ({
  params,
}: {
  params: Promise<{ businessId: string; subscriberId: string }>;
}) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
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

  const handleDelete = (attendanceId: string) => {
    setShowDeletePrompt(true);
    setSelected(attendanceId);
  };

  const onConfirmDelete = () => {
    if (selected) {
      onDeleteCancel();
      toastSuccess(`Attendance deleted successfully`);
    }
  };

  const onDeleteCancel = () => {
    setShowDeletePrompt(false);
    setSelected("");
  };

  return (
    <DefaultLayout>
      <SearchAndFilterBar
        enableSearch={true}
        createNewUrl={`/business/${businessId}/attendance/add`}
      />
      <Attendance attendance={attendance} onDelete={handleDelete} />
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
      <Modal modalIsOpen={showDeletePrompt}>
        <span className="mx-auto inline-block">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.1"
              width="60"
              height="60"
              rx="30"
              fill="#DC2626"
            ></rect>
            <path
              d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
              stroke="#DC2626"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Are you sure?
        </h3>
        <p className="mb-10">
          Would you like to delete the subscriber? Once deleted the data cannot
          be recovered.
        </p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onDeleteCancel}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              Cancel
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onConfirmDelete}
              className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default SubscriberAttendance;
