"use client";
import { useState, useEffect } from "react";
import { getPackages, updatePackage } from "@/actions/business";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { BUSINESS_PACKAGE } from "@/types/business";
import Services from "./Services";
interface Props {
  businessId: string;
  packageId?: string;
}
const PackageForm = ({ businessId, packageId = "" }: Props) => {
  const [selectedPackage, setSelectedPackage] = useState<BUSINESS_PACKAGE>(
    {} as BUSINESS_PACKAGE,
  );
  useEffect(() => {
    async function getData() {
      const { data: packages = [] } = await getPackages(businessId);
      const found = packages.find((p) => p.id === packageId);
      if (found) {
        setSelectedPackage(found);
      }
    }
    if (packageId) {
      getData();
    } else {
      setSelectedPackage({
        id: "",
        packageName: "",
        priceMonthly: 10,
        priceQuarterly: 10,
        priceHalfYearly: 10,
        priceYearly: 10,
        isPopular: false,
        services: [""],
      });
    }
  }, [businessId, packageId]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Add/Edit Details
        </h3>
      </div>
      <form action={updatePackage}>
        <input type="hidden" name="businessId" value={businessId} />
        {packageId && (
          <input type="hidden" name="packageId" value={packageId} />
        )}
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Package Name
              </label>
              <input
                name="packageName"
                type="text"
                placeholder="Package name"
                defaultValue={selectedPackage.packageName}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Is Popular ?
              </label>
              <SwitcherThree
                name="isPopular"
                defaultChecked={selectedPackage.isPopular}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Monthly Price
              </label>
              <input
                name="priceMonthly"
                type="number"
                defaultValue={selectedPackage.priceMonthly}
                placeholder="Price (monthly)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Quarterly Price
              </label>
              <input
                name="priceQuarterly"
                type="number"
                defaultValue={selectedPackage.priceQuarterly}
                placeholder="Price (3 months)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Half-yearly Price
              </label>
              <input
                name="priceHalfYearly"
                type="number"
                defaultValue={selectedPackage.priceHalfYearly}
                placeholder="Price (6 months)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Yearly Price
              </label>
              <input
                name="priceYearly"
                type="number"
                defaultValue={selectedPackage.priceYearly}
                placeholder="Price (12 Months)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <fieldset className="mb-4.5 rounded border border-gray-300 px-5 py-3">
            <legend>Services</legend>
            <Services initialData={selectedPackage.services} />
          </fieldset>

          <div className="flex">
            <button className="rounded bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90">
              Cancel
            </button>
            <button
              type="submit"
              className="ml-auto rounded bg-primary px-10 py-4 font-medium text-gray hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
