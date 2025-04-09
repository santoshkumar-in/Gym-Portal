"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { SingleValue } from "react-select";
import { getPackages } from "@/actions/business";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import FitNxtReactSelect from "@/components/Business/SearchAndFilter/ReactSelect";
import useThrottle from "@/hooks/useThrottle";
import { FILTER_DD_TYPE, SUBSCRIBER, BUSINESS_PACKAGE } from "@/types/business";
import PackageSelection from "./PackageSelection";
import StepProgress from "./StepProgress";
interface SubscriptionFormProps {
  businessId: string;
}

const steps = [
  { name: "Select Subscriber", number: 1 },
  { name: "Select Package", number: 2 },
  { name: "Subscribe", number: 3 },
];

const MultiStepSubscriptionForm = ({ businessId }: SubscriptionFormProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [packages, setPackages] = useState<BUSINESS_PACKAGE[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<BUSINESS_PACKAGE>(
    {} as BUSINESS_PACKAGE,
  );
  const [packageOptions, setPackageOptions] = useState<FILTER_DD_TYPE[]>([]);
  const [subscriberDetails, setSubscriberDetails] = useState<SUBSCRIBER>({
    id: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    height: 0,
    weight: 0,
  });

  const [fetchingSubscriber, setFetchingSubscriber] = useState(false);
  const [mobile, setMobile] = useState("");

  // Fetch packages
  useEffect(() => {
    async function getData() {
      const { success, data = [] } = await getPackages(businessId);
      if (success) {
        setPackages(data);
        const options = data.map(({ packageName, packageId }) => ({
          label: packageName,
          value: packageId,
        }));
        setPackageOptions(options);
      }
    }
    getData();
  }, [businessId]);

  const throttledChangeHandler = useThrottle(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setMobile(value);
      setFetchingSubscriber(true);

      setTimeout(() => {
        // Mock fetching subscriber
        if (value === "1234567890") {
          setSubscriberDetails({
            id: "sub123",
            name: "John Doe",
            mobile: value,
            email: "john@example.com",
            gender: "M",
            height: 170,
            weight: 70,
            dateOfBirth: "1995-03-13",
          });
        } else {
          setSubscriberDetails({
            id: "",
            name: "",
            mobile: value,
            email: "",
            gender: "",
            height: 0,
            weight: 0,
            dateOfBirth: "",
          });
        }

        setFetchingSubscriber(false);
      }, 1000);
    },
    300,
  );

  const handleSubscriberFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubscriberDetails({
      ...subscriberDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handlePackageSelection = (v: SingleValue<FILTER_DD_TYPE>) => {
    const item = packages.find(({ packageId }) => packageId === v?.value);
    if (item) {
      setSelectedPackage(item);
    } else {
      setSelectedPackage({} as BUSINESS_PACKAGE);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      businessId,
      subscriberId: subscriberDetails.id,
      packageId: selectedPackage.packageId,
      price: selectedPackage.price,
    };
    console.log("Form Data to submit:", formData);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
      <h3 className="mb-4 text-center text-lg font-semibold text-black dark:text-white">
        New Subscription
      </h3>

      <StepProgress steps={steps} currentStep={step} />

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <div className="mb-4">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={throttledChangeHandler}
              placeholder="Enter Mobile Number"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

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
                    readOnly={subscriberDetails.id !== ""}
                    value={subscriberDetails.name}
                    onChange={handleSubscriberFieldChange}
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
                    value={subscriberDetails.email}
                    readOnly={subscriberDetails.id !== ""}
                    placeholder="Email"
                    onChange={handleSubscriberFieldChange}
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
                    readOnly={subscriberDetails.id !== ""}
                    value={subscriberDetails.height}
                    placeholder="Height (In CM)"
                    onChange={handleSubscriberFieldChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Weight
                  </label>
                  <input
                    name="weight"
                    type="number"
                    readOnly={subscriberDetails.id !== ""}
                    value={subscriberDetails.weight}
                    placeholder="Weight (in Kg)"
                    onChange={handleSubscriberFieldChange}
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
                    defaultDate={
                      subscriberDetails.dateOfBirth
                        ? new Date(subscriberDetails.dateOfBirth)
                        : new Date()
                    }
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
                    isDisabled={subscriberDetails.id !== ""}
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

          {fetchingSubscriber ? (
            <p>Loading subscriber info...</p>
          ) : (
            <div className="mt-4 flex justify-end gap-4">
              <button
                type="submit"
                className="rounded bg-primary px-6 py-2 font-medium text-white"
              >
                Continue
              </button>
            </div>
          )}
        </form>
      )}

      {step === 2 && (
        <>
          <div className="my-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
              }}
            >
              <PackageSelection businessId={businessId} />
            </form>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded bg-gray-600 px-6 py-2 font-medium text-white"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded bg-primary px-6 py-2 font-medium text-white"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="subscriberId"
            value={subscriberDetails.id}
          />
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Package
            </label>
            <FitNxtReactSelect
              onChange={handlePackageSelection}
              allOptions={packageOptions}
              placeholder="Select Package"
              name="packageId"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Price
            </label>
            <input
              name="price"
              type="number"
              defaultValue={selectedPackage?.price}
              className="w-full rounded border px-4 py-2 dark:bg-form-input dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Start Date
            </label>
            <DatePickerOne name="startDate" />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded bg-gray-600 px-6 py-2 font-medium text-white"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded bg-primary px-6 py-2 font-medium text-white"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MultiStepSubscriptionForm;
