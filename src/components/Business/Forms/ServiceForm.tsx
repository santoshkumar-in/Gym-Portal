
"use client";
import { addBusinessServices } from "@/actions/business";
import { toastSuccess, toastError } from "@/helpers/toast";
import ServiceSelection from "@/components/Business/Forms/SelectionForm";

interface Props {
  businessId: string;
  userId?: string;
}

const ServiceForm = ({ businessId }: Props) => {

  const handleSelectedServices = async (selectedServices) => {
    try {
      const res = await addBusinessServices(businessId, selectedServices);
      toastSuccess("Services added successfully");
    } catch (error) {
      console.error("Failed to add services", error);
      toastError("An error occurred while adding services");
    }
  };

  return (
    <div>
      <ServiceSelection onSelectServices={handleSelectedServices} />
    </div>
  );
};

export default ServiceForm;
