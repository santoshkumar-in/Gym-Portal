"use client";
import { addBusinessServices } from "@/actions/business";
import { toastSuccess, toastError } from "@/helpers/toast";
import ServiceSelection from "@/components/Business/Forms/SelectionForm";
import { useState } from "react";

interface Props {
  businessId: string;
  userId?: string;
}

const ServiceForm = ({ businessId }: Props) => {

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const handleSelectedServices = (selectedServices: string[]) => {
    setSelectedServiceIds(selectedServices);
  };

  const handleSubmit = async () => {
    if (selectedServiceIds.length === 0) {
      toastError("Please select at least one service");
      return;
    }

    try {
      const response = await addBusinessServices(businessId, selectedServiceIds);
      console.log("Response data:", response);
      toastSuccess("Services added successfully");
    } catch (error) {
      console.error("Failed to add services", error);
      toastError("An error occurred while adding services");
    }
  };

  return (
    <div className="">
      <ServiceSelection onSelectServices={handleSelectedServices} />
      <div className="flex justify-end p-3">
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition-all hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;
