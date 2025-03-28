"use client";
import { useEffect, useState } from "react";
import { getPackages } from "@/actions/business";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { FILTER_DD_TYPE } from "@/types/business";
import FitNxtReactSelect from "@/components/Business/SearchAndFilter/ReactSelect";

interface BasicInfoFormProps {
  businessId: string;
}

const BasicInfoForm = ({ businessId }: BasicInfoFormProps) => {
  const [packageOptions, setPackageOptions] = useState<FILTER_DD_TYPE[]>([]);
  useEffect(() => {
    async function getData() {
      const { success, data = [] } = await getPackages(businessId);
      if (success) {
        const options = data.map(({ packageName, packageId }) => {
          return { label: packageName, value: packageId };
        });
        setPackageOptions(options);
      } else {
        setPackageOptions([]);
      }
    }
    getData();
  }, [businessId]);

  const handleFormSubmit = async (formData: FormData) => {
    console.log(formData);
    // const { success, data } = await updateBusinessDetails(formData);
    // if (success) {
    //   setBusinessData(data);
    // }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          New Subscription
        </h3>
      </div>
      <form action={handleFormSubmit}>
        <input type="hidden" name="businessId" value={businessId} />
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Package
              </label>
              <FitNxtReactSelect
                onChange={() => null}
                allOptions={packageOptions}
                placeholder="Select Package"
                name="packageId"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Subscriber Mobile
              </label>
              <input
                name="mobile"
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-6">
            <fieldset className="rounded border border-gray-300 px-5 py-3">
              <legend>Subscriber Details</legend>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Date Of Birth
                  </label>
                  <DatePickerOne />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Height/Weight
                  </label>
                  <input
                    name="height_weight"
                    type="text"
                    placeholder="Height/Weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Gender
                  </label>
                  <FitNxtReactSelect
                    onChange={() => null}
                    allOptions={[
                      { value: "M", label: "Male" },
                      { value: "F", label: "Female" },
                      { value: "OTHER", label: "Other" },
                    ]}
                    placeholder="Select Gender"
                    name="gender"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Price
              </label>
              <input
                name="price"
                type="number"
                placeholder="Enter Price"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Start Date
              </label>
              <DatePickerOne />
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

export default BasicInfoForm;
