"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import { getPackages } from "@/actions/business";
import { BUSINESS_PACKAGES, BUSINESS_PACKAGE } from "@/types/business";
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
}

const PackageSelection = ({ businessId }: Props) => {
  const [packages, setPackages] = useState<BUSINESS_PACKAGES>([]);
  const [expandedPackages, setExpandedPackages] = useState<
    Record<string, boolean>
  >({});

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

  if (!packages) {
    return "Loading Packages...";
  }

  return (
    <div className="">
      <Slider {...settings}>
        {packages.map((pack: BUSINESS_PACKAGE) => {
          const isExpanded = expandedPackages[pack.packageId] || false;
          const serviceHTML = pack.services
            .slice(0, isExpanded ? undefined : 4)
            .map(({ serviceMappingId, serviceName }) => {
              return (
                <li key={serviceMappingId} className="font-medium">
                  <span>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>{" "}
                  {serviceName}
                </li>
              );
            });
          return (
            <div
              key={pack.packageId}
              className="relative h-[480px] overflow-hidden rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark md:p-9 xl:p-11.5"
            >
              {pack.popular && (
                <span className="absolute right-3 top-3.5">
                  <svg
                    width="109"
                    height="34"
                    viewBox="0 0 109 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 0L106 0C107.657 0 109 1.34315 109 3V30L24 30L24 0Z"
                      fill="#3C50E0"
                    ></path>
                    <foreignObject x="24" y="0" width="81" height="30">
                      <div>
                        <div className="mt-1 text-center font-satoshi text-sm font-medium text-white">
                          Best Value
                        </div>
                      </div>
                    </foreignObject>
                    <path d="M0 0H24V30H0L19 15L0 0Z" fill="#3C50E0"></path>
                    <path d="M105 34L109 30H105V34Z" fill="#2539C8"></path>
                  </svg>
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
                {/* <span className="font-medium"> Per Month</span> */}
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
                  onClick={() => toggleExpand(pack.packageId)}
                  className="text-sm text-blue-600 underline"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PackageSelection;
