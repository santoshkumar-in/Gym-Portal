"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import cn from "classnames";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import FitNxtReactSelect from "@/components/Business/SearchAndFilter/ReactSelect";
import { getUserByMobile, createSubscriber } from "@/actions/business";
import { formatDate } from "@/helpers";
import { SUBSCRIBER, BUSINESS_PACKAGE } from "@/types/business";
import PackageSelection from "./PackageSelection";
import StepProgress from "./StepProgress";
import { SubscriberSchemaError } from "@/types/zod-errors";
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
  const [selectedPackage, setSelectedPackage] = useState<BUSINESS_PACKAGE>(
    {} as BUSINESS_PACKAGE,
  );
  const [subscriberDetails, setSubscriberDetails] = useState<SUBSCRIBER>({
    userId: "",
    fullName: "",
    userName: "",
    mobile: 0,
    email: "",
    userGender: "",
    height: 0,
    weight: 0,
  });

  const [fetchingSubscriber, setFetchingSubscriber] = useState(false);
  const [subscriberDOB, setSubscriberDOB] = useState<Date>(new Date());

  const [form1Errors, setForm1Errors] = useState<SubscriberSchemaError>(
    {} as SubscriberSchemaError,
  );

  useEffect(() => {
    async function getData() {
      if (subscriberDetails?.mobile?.toString()?.length === 10) {
        setFetchingSubscriber(true);
        const { data, success } = await getUserByMobile(
          "UH1jADHmrx9lddZkWFAWnQ",
          Number(subscriberDetails.mobile),
        );
        if (success && data?.userExist) {
          setSubscriberDetails({
            userId: data.userId,
            fullName: data.fullName,
            userName: data.userName,
            mobile: data.mobile,
            email: data.email,
            userGender: data.userGender || "M",
            height: data.height,
            weight: data.weight,
          });
        } else {
          setSubscriberDetails({
            userId: "",
            fullName: "",
            userName: "",
            mobile: subscriberDetails.mobile,
            email: "",
            userGender: "",
            height: 0,
            weight: 0,
          });
        }
        setFetchingSubscriber(false);
      }
    }
    getData();
  }, [subscriberDetails.mobile]);

  const handleSubscriberFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubscriberDetails({
      ...subscriberDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitStep1 = async (e: FormEvent) => {
    e.preventDefault();

    if (subscriberDetails.userId) {
      setStep(2);
      return;
    }

    const formData = new FormData();
    Object.entries(subscriberDetails).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      } else {
        formData.append(key, "");
      }
    });

    formData.append("dob", formatDate(subscriberDOB));

    const { success, data, errors } = await createSubscriber(formData);

    if (errors || !success) {
      setForm1Errors(errors || ({} as SubscriberSchemaError));
      console.log("Form Data to submit:", errors);
      return;
    }

    setForm1Errors({} as SubscriberSchemaError);
    setSubscriberDetails({ ...subscriberDetails, userId: data?.userId || "" });
    setStep(2);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      businessId,
      subscriberId: subscriberDetails.userId,
      packageId: selectedPackage.packageId,
      price: selectedPackage.price,
    };
    console.log("Form Data to submit:", formData);
    setStep(2);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
      <h3 className="mb-4 text-center text-lg font-semibold text-black dark:text-white">
        New Subscription
      </h3>

      <StepProgress steps={steps} currentStep={step} />

      {step === 1 && (
        <form onSubmit={handleSubmitStep1}>
          <div className="mb-4">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={subscriberDetails.mobile}
              onChange={handleSubscriberFieldChange}
              placeholder="Enter Mobile Number"
              className={cn(
                "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                {
                  "border-stroke": !form1Errors.mobile,
                  "border-red-500": form1Errors.mobile,
                },
              )}
            />
            {form1Errors.mobile && (
              <p className="pt-1 text-xs text-red-500">
                {form1Errors.mobile._errors[0]}
              </p>
            )}
          </div>

          {!fetchingSubscriber && (
            <fieldset className="rounded border border-gray-300 px-5 py-3">
              <legend>Subscriber Details</legend>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    readOnly={subscriberDetails.userId !== ""}
                    value={subscriberDetails.fullName}
                    onChange={handleSubscriberFieldChange}
                    placeholder="Full Name"
                    className={cn(
                      "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                      {
                        "border-stroke": !form1Errors.fullName,
                        "border-red-500": form1Errors.fullName,
                      },
                    )}
                  />
                  {form1Errors.fullName && (
                    <p className="pt-1 text-xs text-red-500">
                      {form1Errors.fullName._errors[0]}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    value={subscriberDetails.email}
                    readOnly={subscriberDetails.userId !== ""}
                    placeholder="Email"
                    onChange={handleSubscriberFieldChange}
                    className={cn(
                      "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                      {
                        "border-stroke": !form1Errors.email,
                        "border-red-500": form1Errors.email,
                      },
                    )}
                  />
                  {form1Errors.email && (
                    <p className="pt-1 text-xs text-red-500">
                      {form1Errors.email._errors[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Height (In CM)
                  </label>
                  <input
                    name="height"
                    type="number"
                    readOnly={subscriberDetails.userId !== ""}
                    value={subscriberDetails.height}
                    placeholder="Height (In CM)"
                    onChange={handleSubscriberFieldChange}
                    className={cn(
                      "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                      {
                        "border-stroke": !form1Errors.height,
                        "border-red-500": form1Errors.height,
                      },
                    )}
                  />
                  {form1Errors.height && (
                    <p className="pt-1 text-xs text-red-500">
                      {form1Errors.height._errors[0]}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Weight (in Kg)
                  </label>
                  <input
                    name="weight"
                    type="number"
                    readOnly={subscriberDetails.userId !== ""}
                    value={subscriberDetails.weight}
                    placeholder="Weight (in Kg)"
                    onChange={handleSubscriberFieldChange}
                    className={cn(
                      "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                      {
                        "border-stroke": !form1Errors.weight,
                        "border-red-500": form1Errors.weight,
                      },
                    )}
                  />
                  {form1Errors.weight && (
                    <p className="pt-1 text-xs text-red-500">
                      {form1Errors.weight._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Date Of Birth
                  </label>
                  <DatePickerOne
                    onChange={(date) => {
                      setSubscriberDOB(date as Date);
                    }}
                    defaultDate={
                      subscriberDetails.dob
                        ? new Date(subscriberDetails.dob)
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
                    isDisabled={subscriberDetails.userId !== ""}
                    placeholder="Select Gender"
                    name="userGender"
                    defaultValue={{
                      value: subscriberDetails.userGender || "M",
                      label: subscriberDetails.userGender || "Male",
                    }}
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Username
                  </label>
                  <input
                    name="userName"
                    type="text"
                    readOnly={subscriberDetails.userId !== ""}
                    value={subscriberDetails.userName}
                    onChange={handleSubscriberFieldChange}
                    placeholder="Username"
                    className={cn(
                      "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                      {
                        "border-stroke": !form1Errors.userName,
                        "border-red-500": form1Errors.userName,
                      },
                    )}
                  />
                  {form1Errors.userName && (
                    <p className="pt-1 text-xs text-red-500">
                      {form1Errors.userName._errors[0]}
                    </p>
                  )}
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
                {!subscriberDetails.userId && subscriberDetails.mobile
                  ? "Create Subscriber"
                  : `Continue`}
              </button>
            </div>
          )}
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (Object.keys(selectedPackage).length > 0) {
              setStep(3);
            }
          }}
        >
          <div className="my-8">
            <PackageSelection
              businessId={businessId}
              onSelectPackage={(pack) => setSelectedPackage(pack)}
            />
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
              Continue
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="subscriberId"
            value={subscriberDetails.userId}
          />
          <input
            type="hidden"
            name="packageId"
            value={selectedPackage.packageId}
          />

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
              onClick={() => {
                setStep(2);
                setSelectedPackage({} as BUSINESS_PACKAGE);
              }}
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
