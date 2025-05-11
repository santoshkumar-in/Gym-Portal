"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import FitNxtReactSelect from "@/components/Business/SearchAndFilter/ReactSelect";
import {
  getUserByMobile,
  createSubscriber,
  createSubscription,
  getPaymentMode,
  getPaymentStatuses,
} from "@/actions/business";
import { formatDate } from "@/helpers";
import { SUBSCRIBER, BUSINESS_PACKAGE, FILTER_DD_TYPE } from "@/types/business";
import PackageSelection from "./PackageSelection";
import StepProgress from "./StepProgress";
import { SubscriberSchemaError } from "@/types/zod-errors";
import { toastSuccess } from "@/helpers/toast";

interface SubscriptionFormProps {
  businessId: string;
}

const steps = [
  { name: "Select Subscriber", number: 1 },
  { name: "Select Package", number: 2 },
  { name: "Price & Date", number: 3 },
  { name: "Subscribe", number: 4 },
];

const MultiStepSubscriptionForm = ({ businessId }: SubscriptionFormProps) => {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
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

  const [fetchingSubscriber, setFetchingSubscriber] = useState<boolean>(false);
  const [subscriberDOB, setSubscriberDOB] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [newPrice, setNewPrice] = useState<number>(0);
  const [showPriceError, setShowPriceError] = useState<boolean>(false);
  const [paymentStatuses, setPaymentStatuses] = useState<FILTER_DD_TYPE[]>(
    [] as FILTER_DD_TYPE[],
  );
  const [paymentModes, setPaymentModes] = useState<FILTER_DD_TYPE[]>(
    [] as FILTER_DD_TYPE[],
  );

  const [form1Errors, setForm1Errors] = useState<SubscriberSchemaError>(
    {} as SubscriberSchemaError,
  );

  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState<FILTER_DD_TYPE>({} as FILTER_DD_TYPE);
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState<FILTER_DD_TYPE>({} as FILTER_DD_TYPE);

  useEffect(() => {
    async function getPaymentModesOptions() {
      const { success, data = [] } = await getPaymentMode();
      if (success) {
        const payModes = data.map(({ id: value, value: label }) => {
          return { value, label };
        });
        const payCash = payModes.find(({ label }) => label === "Cash");

        setPaymentModes(payModes as FILTER_DD_TYPE[]);
        setSelectedPaymentMode(payCash as FILTER_DD_TYPE);
      } else {
        setPaymentModes([] as FILTER_DD_TYPE[]);
        setSelectedPaymentMode({} as FILTER_DD_TYPE);
      }
    }
    async function getPaymentStatusOptions() {
      const { success, data = [] } = await getPaymentStatuses();
      if (success) {
        const payStatuses = data.map(({ id: value, value: label }) => {
          return { value, label };
        });
        const payReceived = payStatuses.find(
          ({ label }) => label === "Recieved",
        );
        setPaymentStatuses(payStatuses as FILTER_DD_TYPE[]);
        setSelectedPaymentStatus(payReceived as FILTER_DD_TYPE);
      } else {
        setPaymentStatuses([] as FILTER_DD_TYPE[]);
        setSelectedPaymentStatus({} as FILTER_DD_TYPE);
      }
    }
    getPaymentModesOptions();
    getPaymentStatusOptions();
  }, []);

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
            userName: data.username,
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

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPrice(Number(e.target.value));
    if (Number(e.target.value) < Number(selectedPackage.sellingPrice)) {
      setShowPriceError(true);
    } else {
      setShowPriceError(false);
    }
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
    console.log(errors, success);
    if (errors || !success) {
      setForm1Errors(errors || ({} as SubscriberSchemaError));
      console.log("Form Data to submit:", errors);
      return;
    }

    setForm1Errors({} as SubscriberSchemaError);
    setSubscriberDetails({ ...subscriberDetails, userId: data?.userId || "" });
    setStep(2);
  };

  const handleSubmit3 = (e: FormEvent) => {
    e.preventDefault();
    if (!showPriceError) {
      setStep(4);
    }
  };

  const handleSubmit4 = async () => {
    const formData = {
      userId: subscriberDetails.userId,
      packageId: selectedPackage.packageId,
      extraDiscount: selectedPackage.price - newPrice,
      payMode: selectedPaymentMode.value,
      payStatus: selectedPaymentStatus.value,
      startDate: formatDate(startDate),
    };
    const { success } = await createSubscription(
      formData as {
        [k: string]: string | number;
      },
    );
    if (success) {
      toastSuccess("Package Subscribed Successfully");
      router.push(`/business/${businessId}/subscriber`);
    }
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
                    disabled={subscriberDetails.userId !== ""}
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
              onSelectPackage={(pack) => {
                setSelectedPackage(pack);
                setNewPrice(pack.sellingPrice);
              }}
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
        <form onSubmit={handleSubmit3}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Price
            </label>
            <input
              name="price"
              type="number"
              onChange={handlePriceChange}
              defaultValue={selectedPackage?.price}
              className="w-full rounded border px-4 py-2 dark:bg-form-input dark:text-white"
            />
            {showPriceError && (
              <p className="pt-1 text-xs text-red-500">
                Price can&apos;t be less than INR {selectedPackage.sellingPrice}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Start Date
            </label>
            <DatePickerOne onChange={(d) => setStartDate(d as Date)} />
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

      {step === 4 && (
        <div>
          <table className="w-full py-8 text-left">
            <tbody>
              <tr className="border-b border-gray-300">
                <th className="py-3">
                  <h4 className="font-bold">User</h4>
                </th>
                <td className="py-3">{`${subscriberDetails.fullName || "NA"}, ${subscriberDetails.mobile || "NA"}`}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="py-3">
                  <h4 className="font-bold">Package</h4>
                </th>
                <td className="py-3">
                  {selectedPackage.packageName}
                  <ul className="list-disc pl-3 pt-2 text-[12px]">
                    {selectedPackage.services.map(({ serviceName }) => (
                      <li key={serviceName}> {serviceName}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="py-3">
                  {" "}
                  <h4 className="font-bold">Price</h4>
                </th>
                <td className="py-3">
                  <span>
                    {`INR ${newPrice}`}{" "}
                    {selectedPackage.price > newPrice && (
                      <s>{selectedPackage.price}</s>
                    )}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="py-3">
                  <h4 className="font-bold">Start date</h4>
                </th>
                <td className="py-3">{formatDate(startDate)}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="py-3">
                  <h4 className="font-bold">Payment Mode</h4>
                </th>
                <td className="py-3">
                  <FitNxtReactSelect
                    onChange={(v) =>
                      setSelectedPaymentMode(v as FILTER_DD_TYPE)
                    }
                    allOptions={paymentModes}
                    placeholder="Select Payment mode"
                    name="payMode"
                    defaultValue={selectedPaymentMode}
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="py-3">
                  <h4 className="font-bold">Payment Status</h4>
                </th>
                <td className="py-3">
                  <FitNxtReactSelect
                    onChange={(v) =>
                      setSelectedPaymentStatus(v as FILTER_DD_TYPE)
                    }
                    allOptions={paymentStatuses}
                    placeholder="Select Payment status"
                    name="payStatus"
                    defaultValue={selectedPaymentStatus}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                setStep(3);
              }}
              className="rounded bg-gray-600 px-6 py-2 font-medium text-white"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit4}
              className="rounded bg-primary px-6 py-2 font-medium text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepSubscriptionForm;
