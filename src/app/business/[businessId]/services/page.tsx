"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import { toastSuccess, toastError } from "@/helpers/toast";
import {
  deleteBusinessServices,
  getBusinessServices,
} from "@/actions/business";
import BusinessServices from "@/components/Business/Services";
import SearchAndFilterBar from "@/components/Business/SearchAndFilter";
import { BUSINESS_SERVICE } from "@/types/business";
import { useServiceStore } from "@/store/useServiceStore";

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

const Services = ({ params }: { params: Promise<{ businessId: string }> }) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [businessId, setBusinessId] = useState<string>("");


  const [currentSearchAndFilters, setCurrentSearchAndFilters] = useState<{
    [key: string]: unknown;
  }>({
    searchTerm: "",
    status: "",
  });

  const { data, setData,removeService } = useServiceStore();

  useEffect(() => {
    const fetchBusinessId = async () => {
      const { businessId: bId } = await params;
      setBusinessId(bId);
    };
    fetchBusinessId();
  }, [params]);

  useEffect(() => {
    if (businessId) {
      fetchServices();
    }
  }, [businessId, currentSearchAndFilters]);

  const fetchServices = async () => {
    // clearData(); // Clear previous data if needed
    try {
      const { success, data, message } =
        await getBusinessServices(businessId, {
          searchTerm: currentSearchAndFilters.searchTerm,
          status: currentSearchAndFilters.status,
        });

      if (success && data) {
        setData(data as BUSINESS_SERVICE[]);
      } else {
        console.error("Unexpected response format", message);
        toastError(message || "Failed to fetch services");
      }
    } catch (error) {
      console.error("Failed to fetch services", error);
      toastError("An error occurred while fetching services");
    }
  };

  const handleDelete = (serviceId: string) => {
    setShowDeletePrompt(true);
    setSelected(serviceId);
  };

  const onConfirmDelete = async () => {
    if (!selected || !businessId) {
      toastError("No service ID or business ID found");
      return;
    }

    try {
      const { success, message } = await deleteBusinessServices(businessId, selected);

      if (success) {
        toastSuccess("Service deleted successfully");
        removeService(selected);
        setShowDeletePrompt(false);
        setSelected(null);
      } else {
        toastError(message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Failed to delete service", error);
      toastError("An error occurred while deleting the service");
    }
  };

  const onDeleteCancel = () => {
    setShowDeletePrompt(false);
    setSelected(null);
  };

  const handleFilterValueChange = (filters: { [key: string]: unknown }) => {
    setCurrentSearchAndFilters(filters);
  };


  return (
    <DefaultLayout>
      <SearchAndFilterBar
        tableFilterOptions={tableFilters}
        onChange={handleFilterValueChange}
        enableSearch={true}
        createNewUrl={`/business/${businessId}/services/add`}
        // services={true}
        {...({ services: true } as { services: boolean })}
      // added for conditonally not show filter or search in service page instand of creating new search component for service , need to figure out how we can do this by creating a new component or by showing condetonaly.
      />
      <BusinessServices
        onDelete={handleDelete}
        services={data}
        businessId={businessId}
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
          Would you like to delete this service? Once deleted, the data cannot
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

export default Services;



