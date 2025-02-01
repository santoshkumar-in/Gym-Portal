import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BasicInfo from "@/components/Business/BasicInfo";
import ServicePackages from "@/components/Business/ServicePackages";
import Medias from "@/components/Business/Medias";

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
