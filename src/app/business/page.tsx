import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BasicInfo from "./components/BasicInfo";
import ServicePackages from "./components/ServicePackages";
import Medias from "./components/Medias";

const BusinessDetails = () => {
  const businessId = "34884";
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        {/* Basic Infos */}
        <BasicInfo businessId={businessId} />

        {/* Service Packages */}
        <ServicePackages businessId={businessId} />

        {/* Gallery */}
        <Medias businessId={businessId} />
      </div>
    </DefaultLayout>
  );
};

export default BusinessDetails;
