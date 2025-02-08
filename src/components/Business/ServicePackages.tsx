"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

import FitNxtDropDowns from "@/components/Dropdowns/FitNxtDropDowns";
import { getPackages } from "@/actions/business";
import Modal from "@/components/Modal";
import { BUSINESS_PACKAGES, BUSINESS_PACKAGE } from "@/types/business";
import { toastSuccess } from "@/helpers/toast";
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

const ServicePackages = ({ businessId }: Props) => {
  const [packages, setPackages] = useState<BUSINESS_PACKAGES>([]);
  const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<BUSINESS_PACKAGE>();

  useEffect(() => {
    async function getData() {
      const { data = [] } = await getPackages(businessId);
      setPackages(data);
    }
    getData();
  }, [businessId]);

  const onEdit = (packageId: string) => {
    redirect(`/business/${businessId}/edit/package/${packageId}`);
  };

  const handleAddPackage = () => {
    redirect(`/business/${businessId}/add/package`);
  };

  const onDelete = (pack: BUSINESS_PACKAGE) => {
    setShowDeletePrompt(true);
    setSelectedPackage(pack);
  };

  const onConfirmDelete = () => {
    if (selectedPackage) {
      onDeleteCancel();
      toastSuccess(`${selectedPackage.packageName} is deleted successfully`);
    }
  };

  const onDeleteCancel = () => {
    setShowDeletePrompt(false);
    setSelectedPackage(undefined);
  };

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
          <button
            onClick={handleAddPackage}
            className="inline-flex items-center justify-center rounded bg-primary px-5 py-1 text-center font-medium text-white hover:bg-opacity-90"
          >
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
                  <FitNxtDropDowns>
                    <button
                      onClick={() => onEdit(pack.id)}
                      className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(pack)}
                      className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                      Delete
                    </button>
                  </FitNxtDropDowns>
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
          You want to delete{" "}
          <span className="font-bold">{selectedPackage?.packageName}</span>.
          Once deleted the data cannot be recovered.
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
    </div>
  );
};

export default ServicePackages;
