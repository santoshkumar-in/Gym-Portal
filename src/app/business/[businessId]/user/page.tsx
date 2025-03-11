"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { toastSuccess, toastError } from "@/helpers/toast";
import { getAllUsers } from "@/actions/business";
import { BUSINESS_USER } from "@/types/business";
import Users from "@/components/Business/Users";
import SearchAndFilterBar from "@/components/Business/SearchAndFilter";

const tableFilters = [
  {
    value: "status",
    label: "Status",
    fieldType: "select",
    selectOptions: [
      { value: "ALL", label: "All" },
      { value: "ACTIVE", label: "Active" },
      { value: "INACTIVE", label: "Inactive" },
    ],
  },
];

const BusinessUsers = ({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [users, setUsers] = useState<BUSINESS_USER[]>([]);
  const [businessId, setBusinessId] = useState<string>("");
  const [paginationData, setPaginationData] = useState<{ [k: string]: number }>(
    { currentPage: 1, perPage: 10, total: 0, },
  );

  const [currentSearchAndFilters, setCurrentSearchAndFilters] = useState<{
    [k: string]: unknown;
  }>({ searchTerm: "", status: "" });

  console.log(users);

  useEffect(() => {
    const getBusinessId = async () => {
      const { businessId: bId } = await params;
      setBusinessId(bId);
    };
    getBusinessId();
  }, [params]);

  useEffect(() => {
    const { currentPage, perPage, total } = paginationData;
    const { searchTerm, status } = currentSearchAndFilters;
    const bodyParams = {
      perPage,
      currentPage,
      total,
      searchTerm,
      status,
    };
    getData(bodyParams);
  }, [businessId]);

  // console.log(paginationData)

  const getData = async (params: { [s: string]: unknown }) => {
    try {
      const res = await getAllUsers(businessId, params);
      // console.log(res)

      setPaginationData((prev) => ({
        ...prev,
        currentPage: res.currentPage,
        perPage: res.perPage,
        total: res.total
      }));

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error("Wrong data format", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleDelete = (userId: string | undefined) => {
    setShowDeletePrompt(true);
    if (userId) {
      setSelected(userId);
    }
  };

  const onConfirmDelete = () => {
    if (selected) {
      onDeleteCancel();
      toastSuccess(`User is deleted successfully`);
    }
  };

  const onDeleteCancel = () => {
    setShowDeletePrompt(false);
    setSelected("");
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const newStatus = e.target.checked;
    console.log("Updating status for user:", userId, "New Status:", newStatus);

    try {
      const response = await getData({ userId, enabled: newStatus });
      console.log(response)

      toastSuccess(`User status updated successfully`);
    } catch (error) {
      toastError("Failed to update user status");
      console.error("Status update error:", error);
    }
  };

  const handleFilterValueChange = (arg: { [key: string]: unknown }) => {
    setCurrentSearchAndFilters(arg);
    const { currentPage, perPage } = paginationData;
    const bodyParams = {
      perPage,
      currentPage,
      ...arg,
    };
    getData(bodyParams);
  };

  const handlePageChange = (page: number) => {
    setPaginationData((prev) => ({ ...prev, currentPage: page }));

    const { perPage, total } = paginationData;
    const { searchTerm, status } = currentSearchAndFilters;
    const bodyParams = {
      perPage,
      currentPage: page,
      total,
      searchTerm,
      status,
    };
    console.log("Sending API request with:", bodyParams);
    getData(bodyParams);
  };

  const handlePerPageChange = (perPage: number) => {
    setPaginationData((prev) => ({ ...prev, perPage }));
    const { currentPage, total } = paginationData;
    const { searchTerm, status } = currentSearchAndFilters;
    const bodyParams = {
      perPage,
      currentPage,
      total,
      searchTerm,
      status,
    };
    console.log("Sending API request with:", bodyParams);
    getData(bodyParams);
  };

  return (
    <DefaultLayout>
      <SearchAndFilterBar
        tableFilterOptions={tableFilters}
        onChange={handleFilterValueChange}
        enableSearch={true}
        createNewUrl={`/business/${businessId}/user/add`}
      />
      <Users
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        users={users}
        businessId={businessId}
      />
      <Pagination
        onPerPageChange={handlePerPageChange}
        onPageChange={handlePageChange}
        currentPage={paginationData.currentPage}
        perPage={paginationData.perPage}
        total={paginationData.total}
      />
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

export default BusinessUsers;
