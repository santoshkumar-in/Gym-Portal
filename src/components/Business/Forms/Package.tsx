
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPackages, addOrUpdatePackage, getValidities, getBusinessAllServices, } from "@/actions/business";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import FitNxtReactSelect from "@/components/Business/SearchAndFilter/ReactSelect";
import FitNxtMultiReactSelect from "@/components/Business/SearchAndFilter/ReactSelectMultiSelect";
import { BUSINESS_PACKAGE, FILTER_DD_TYPE } from "@/types/business";
import { toastSuccess, toastError } from "@/helpers/toast";
import { BusinessPackageSchemaError } from "@/types/zod-errors";
import cn from "classnames";

interface Props {
  businessId: string;
  packageId?: string;
}

const PackageForm = ({ businessId, packageId = "" }: Props) => {
  const [selectedPackage, setSelectedPackage] = useState<BUSINESS_PACKAGE>({} as BUSINESS_PACKAGE,);
  const [validityOptions, setValidityOptions] = useState<FILTER_DD_TYPE[]>([]);
  const [servicesOptions, setServicesOptions] = useState<FILTER_DD_TYPE[]>([]);
  const [selectedValidity, setSelectedValidity] = useState<FILTER_DD_TYPE | null>(null);
  const [selectedServices, setSelectedServices] = useState<FILTER_DD_TYPE[]>([]);
  const [formErrors, setFormErrors] = useState<BusinessPackageSchemaError>({} as BusinessPackageSchemaError,);
  const [popular, setPopular] = useState<boolean>(false);
  const router = useRouter();

  // Load existing package if editing
  useEffect(() => {
    async function getData() {
      const { data: packages = [] } = await getPackages(businessId);
      const found = packages.find((p) => p.packageId === packageId);
      if (found) {
        setSelectedPackage(found);
        setPopular(found.popular || false);
        const selected = found.services?.map(({ serviceMappingId: value, serviceName: label }) => ({ value, label })) || [];
        setSelectedServices(selected);
      }
    }

    if (packageId) {
      getData();
    } else {
      setSelectedPackage({
        businessId,
        packageId: "",
        packageName: "",
        price: 100,
        discount: 10,
        minPrice: 90,
        sellingPrice: 90,
        validityId: "",
        subscriptionLimit: 110,
        popular: false,
        services: [],
      });
    }
  }, [businessId, packageId]);

  useEffect(() => {
    async function getData() {
      const { data = [] } = await getValidities();
      const options = data.map(({ id, value }) => ({ value: id, label: value }));
      setValidityOptions(options);
    }
    getData();
  }, []);

  useEffect(() => {
    const selected = validityOptions.find(({ value }) => value === selectedPackage.validityId);
    if (selected) {
      setSelectedValidity(selected);
    }
  }, [validityOptions, selectedPackage]);

  useEffect(() => {
    async function getServices() {
      const { data = [] } = await getBusinessAllServices(businessId);
      const options = data.map(({ serviceMappingId: value, serviceName: label }) => ({ value, label }));
      setServicesOptions(options);
    }
    getServices();
  }, [businessId]);

  const handlePopularFiledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPopular(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newFormData = new FormData();

    const packageName = formData.get("packageName")?.toString() || "";
    const price = formData.get("price")?.toString() || "0";
    const discount = formData.get("discount")?.toString() || "0";
    const minPrice = formData.get("minPrice")?.toString() || "0";
    const subscriptionLimit = formData.get("subscriptionLimit")?.toString() || "0";
    const validityId = selectedValidity?.value || "";

    newFormData.append("businessId", businessId);
    if (packageId) newFormData.append("packageId", packageId);
    newFormData.append("packageName", packageName);
    newFormData.append("price", price);
    newFormData.append("discount", discount);
    newFormData.append("minPrice", minPrice);
    newFormData.append("subscriptionLimit", subscriptionLimit);
    newFormData.append("validityId", validityId);
    newFormData.append("popular", popular ? "1" : "0");

    if (selectedServices.length > 0) {
      selectedServices.forEach((service) => {
        newFormData.append("availableServices", service.value);
      });
    }

    const { success, errors } = await addOrUpdatePackage(newFormData);

    if (!success || errors) {
      setFormErrors(errors || {} as BusinessPackageSchemaError);
      toastError("Validation failed. Please check the fields.");
      console.log("Form Data to submit:", errors);
      return;
    }

    toastSuccess("Package Added/Updated Successfully");
    router.push(`/business/${businessId}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Add/Edit Details
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
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
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.packageName,
                    "border-red-500": formErrors.packageName,
                  },
                )}
              />
              {formErrors.packageName && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.packageName._errors[0]}
                </p>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Is Popular ?
              </label>
              <SwitcherThree
                name="popular"
                onChange={handlePopularFiledChange}
                defaultChecked={selectedPackage.popular}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Price
              </label>
              <input
                name="price"
                type="number"
                defaultValue={selectedPackage.price}
                placeholder="Price"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.price,
                    "border-red-500": formErrors.price,
                  },
                )}
              />
              {formErrors.price && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.price._errors[0]}
                </p>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Discount
              </label>
              <input
                name="discount"
                type="number"
                defaultValue={selectedPackage.discount}
                placeholder="Discount"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.discount,
                    "border-red-500": formErrors.discount,
                  },
                )}
              />
              {formErrors.discount && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.discount._errors[0]}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Min Price
              </label>
              <input
                name="minPrice"
                type="number"
                defaultValue={selectedPackage.sellingPrice}
                placeholder="minPrice"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.minPrice,
                    "border-red-500": formErrors.minPrice,
                  },
                )}
              />
              {formErrors.minPrice && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.minPrice._errors[0]}
                </p>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Subscription Limit
              </label>
              <input
                name="subcriptionLimit"
                type="number"
                defaultValue={selectedPackage.subscriptionLimit || 1000}
                placeholder="Subscription Limit"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.subcriptionLimit,
                    "border-red-500": formErrors.subcriptionLimit,
                  },
                )}
              />
              {formErrors.subcriptionLimit && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.subcriptionLimit._errors[0]}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Validity
              </label>
              <FitNxtReactSelect
                onChange={(val) => setSelectedValidity(val)}
                allOptions={validityOptions}
                placeholder="Select Validity"
                name="validityId"
                defaultValue={selectedValidity}
              />
              {formErrors.validityId && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.validityId._errors?.[0]}
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Services
              </label>
              <FitNxtMultiReactSelect
                onChange={(val) => setSelectedServices([...val])}
                allOptions={servicesOptions}
                placeholder="Select Services"
                name="availableServices"
                defaultValue={selectedServices}
              />
              {formErrors.availableServices && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.availableServices._errors?.[0] ||
                    "Please select at least one service."}
                </p>
              )}
            </div>
          </div>
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
