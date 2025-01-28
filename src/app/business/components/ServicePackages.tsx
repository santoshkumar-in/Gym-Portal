"use client";
import { useState, useEffect } from "react";

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import EditDropdown from "@/components/Dropdowns/EditDropdown";
import { getPackages } from "@/actions/business";
import { BUSINESS_PACKAGES, BUSINESS_PACKAGE } from "@/types/business";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

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

const ServicePackages = ({ businessId }: Props) => {
  const [packages, setPackages] = useState<BUSINESS_PACKAGES>();

  useEffect(() => {
    async function getData() {
      const response = await getPackages(businessId);
      setPackages(response.data);
    }
    getData();
  }, []);

  if (!packages) {
    return "Loading...";
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex items-center rounded-sm bg-white px-4 py-4 shadow-default sm:px-6 xl:px-7.5">
        <h3 className="font-bold text-black dark:text-white">
          Service Packages
        </h3>
        <div className="ml-auto">
          <button className="inline-flex items-center justify-center rounded bg-primary px-5 py-1 text-center font-medium text-white hover:bg-opacity-90">
            <span className="mr-1">
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>

      {/* Packages */}
      <div className="mb-10">
        <Slider {...settings}>
          {packages.map((pack: BUSINESS_PACKAGE) => {
            const serviceHTML = pack.services.map((service) => {
              return (
                <li key={service} className="font-medium">
                  <span>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>{" "}
                  {service}
                </li>
              );
            });
            return (
              <div
                key={pack.id}
                className="relative rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark md:p-9 xl:p-11.5"
              >
                <span className="absolute right-3 top-3.5">
                  {/* <svg
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
                      </svg> */}
                  <EditDropdown />
                </span>
                <span className="mb-2.5 block text-title-sm2 font-bold text-black dark:text-white">
                  {pack.packageName}
                </span>
                <h3>
                  <span className="text-xl font-medium text-black dark:text-white">
                    ₹
                  </span>
                  <span className="text-title-xxl2 font-bold text-black dark:text-white">
                    {pack.priceMonthly}
                  </span>
                  <span className="font-medium"> Per Month</span>
                </h3>
                <h4 className="mb-5 mt-7.5 text-lg font-medium text-black dark:text-white">
                  Services
                </h4>
                <ul className="flex flex-col gap-3.5">{serviceHTML}</ul>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ServicePackages;
