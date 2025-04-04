"use client";
import { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { getPackages } from "@/actions/business";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { FILTER_DD_TYPE, SUBSCRIBER, BUSINESS_PACKAGE } from "@/types/business";
import FitNxtReactSelect from "@/components/Business/SearchAndFilter/ReactSelect";
import useThrottle from "@/hooks/useThrottle";

interface SubscriptionFormProps {
  businessId: string;
}

const SubscriptionForm = ({ businessId }: SubscriptionFormProps) => {
  const [packages, setPackages] = useState<BUSINESS_PACKAGE[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<BUSINESS_PACKAGE>(
    {} as BUSINESS_PACKAGE,
  );
  const [packageOptions, setPackageOptions] = useState<FILTER_DD_TYPE[]>([]);

  const [fetchingSubscriber, setFetchingSubscriber] = useState<boolean>(false);
  const [subscriberDetails, setSubscriberDetails] = useState<SUBSCRIBER>({
    id: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    heightWeightRatio: "",
  });
  useEffect(() => {
    async function getData() {
      const { success, data = [] } = await getPackages(businessId);
      if (success) {
        setPackages(data);
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

  const throttledChangeHandler = useThrottle(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      //console.log("Throttled Value:", event.target.value);
      setFetchingSubscriber(true);
      setTimeout(() => {
        console.log("Entered ", event.target.value);
        setSubscriberDetails({
          ...subscriberDetails,
          mobile: event.target.value,
        });
        setFetchingSubscriber(false);
      }, 1500);
    },
    300,
  );

  const handlePackageSelection = (v: SingleValue<FILTER_DD_TYPE>) => {
    const item = packages.find(({ packageId }) => packageId === v?.value);
    if (item) {
      setSelectedPackage(item);
    } else {
      setSelectedPackage({} as BUSINESS_PACKAGE);
    }
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
                onChange={handlePackageSelection}
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
                onChange={throttledChangeHandler}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-6">
            {!fetchingSubscriber && (
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
                      readOnly={subscriberDetails.id ? true : false}
                      defaultValue={subscriberDetails.name}
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
                      defaultValue={subscriberDetails.email}
                      readOnly={subscriberDetails.id ? true : false}
                      placeholder="Email"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Height
                    </label>
                    <input
                      name="height"
                      type="number"
                      readOnly={subscriberDetails.id ? true : false}
                      defaultValue={subscriberDetails.heightWeightRatio}
                      placeholder="Height (In cm)"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Weight
                    </label>
                    <input
                      name="weight"
                      type="text"
                      readOnly={subscriberDetails.id ? true : false}
                      defaultValue={subscriberDetails.heightWeightRatio}
                      placeholder="Weight (in Kg)"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Date Of Birth
                    </label>
                    <DatePickerOne
                      clickOpens={subscriberDetails.id ? true : false}
                    />
                  </div>
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
                      defaultValue={{
                        value: subscriberDetails.gender || "M",
                        label: subscriberDetails.gender || "Male",
                      }}
                    />
                  </div>
                </div>
              </fieldset>
            )}
            {fetchingSubscriber && (
              <p>Fetching Subscriber&lsquo;s details...</p>
            )}
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Discounted Price
              </label>
              <input
                name="price"
                type="number"
                placeholder="Enter Price"
                defaultValue={selectedPackage?.price}
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

export default SubscriptionForm;
