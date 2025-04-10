"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { getPackages } from "@/actions/business";
import { BUSINESS_PACKAGE } from "@/types/business";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  className:
    "service-package-slick-slider after:content-[''] after:block after:clear-both",
};

interface Props {
  businessId: string;
  onSelectPackage: (s: BUSINESS_PACKAGE) => void;
}

const PackageSelection = ({ businessId, onSelectPackage }: Props) => {
  const [packages, setPackages] = useState<BUSINESS_PACKAGE[]>([]);
  const [expandedPackages, setExpandedPackages] = useState<
    Record<string, boolean>
  >({});
  const [selectedPackage, setSelectedPackage] = useState<BUSINESS_PACKAGE>(
    {} as BUSINESS_PACKAGE,
  );

  useEffect(() => {
    async function getData() {
      const { success, data = [] } = await getPackages(businessId);
      if (success) {
        setPackages(data);
      } else {
        setPackages([]);
      }
    }
    getData();
  }, [businessId]);

  const toggleExpand = (packageId: string) => {
    setExpandedPackages((prev) => ({
      ...prev,
      [packageId]: !prev[packageId],
    }));
  };

  const handlePackageSelection = (pack: BUSINESS_PACKAGE) => {
    console.log("packageID", pack.packageId);
    setSelectedPackage(pack);
    onSelectPackage(pack);
  };

  if (!packages) return <>Loading Packages...</>;

  return (
    <div className="">
      <Slider {...settings}>
        {packages.map((pack: BUSINESS_PACKAGE) => {
          const isExpanded = expandedPackages[pack.packageId] || false;
          const isSelected = selectedPackage.packageId === pack.packageId;

          const serviceHTML = pack.services
            .slice(0, isExpanded ? undefined : 4)
            .map(({ serviceMappingId, serviceName }) => (
              <li key={serviceMappingId} className="font-medium">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="mr-2 text-primary"
                />
                {serviceName}
              </li>
            ));

          return (
            <label
              key={pack.packageId}
              className={`relative h-[480px] cursor-pointer overflow-hidden rounded-sm border p-6 shadow-default transition-all duration-200 md:p-9 xl:p-11.5 ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-400 dark:bg-blue-950"
                  : "border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
              }`}
            >
              <input
                type="radio"
                name="package"
                value={pack.packageId}
                checked={isSelected}
                onChange={() => handlePackageSelection(pack)}
                className="pointer-events-none absolute opacity-0"
              />

              {pack.popular && (
                <span className="absolute right-3 top-3.5">
                  {/* Same "Best Value" SVG as before */}
                </span>
              )}

              <span className="mb-2.5 block text-title-sm2 font-bold text-black dark:text-white">
                {pack.packageName}
              </span>
              <h3>
                <span className="text-xl font-medium text-black dark:text-white">
                  ₹
                </span>
                <span className="text-title-xxl2 font-bold text-black dark:text-white">
                  {pack.price}
                </span>
              </h3>

              <div className="mt-5">
                <p className="flex justify-between">
                  <span> Discount </span>
                  <span className="font-medium text-black dark:text-white">
                    {pack.discount}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span> Selling Price </span>
                  <span className="font-medium text-black dark:text-white">
                    {pack.sellingPrice}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span> Validity (In Days) </span>
                  <span className="font-medium text-black dark:text-white">
                    {pack.validityDays}
                  </span>
                </p>
              </div>

              <h4 className="my-5 text-lg font-medium text-black dark:text-white">
                Services
              </h4>
              <ul className="flex max-h-[150px] flex-col gap-3.5 overflow-y-auto">
                {serviceHTML}
              </ul>

              {pack.services.length > 2 && (
                <button
                  onClick={(e) => {
                    e.preventDefault(); // prevent radio select from toggling
                    toggleExpand(pack.packageId);
                  }}
                  className="text-sm text-blue-600 underline"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </label>
          );
        })}
      </Slider>
      <h4>Selected Package</h4>
      <p>
        {selectedPackage.packageId
          ? selectedPackage.packageName + " : INR " + selectedPackage.price
          : "None"}
      </p>
    </div>
  );
};

export default PackageSelection;
