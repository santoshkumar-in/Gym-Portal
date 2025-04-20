
"use client";
import { useRef, useEffect, useState } from "react";
import { updateBusinessDetails, getBusinessDetails } from "@/actions/business";
import useGeoLocation from "@/hooks/useGeoLocation";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { BUSINESS } from "@/types/business";
import cn from "classnames";
import { BusinessInfoFormSchemaError } from "@/types/zod-errors";

interface BasicInfoFormProps {
  businessId: string;
}

const BasicInfoForm = ({ businessId }: BasicInfoFormProps) => {
  const [businessData, setBusinessData] = useState<BUSINESS | undefined>(
    {} as BUSINESS
  );

  const [formErrors, setFormErrors] = useState<BusinessInfoFormSchemaError>(
    {} as BusinessInfoFormSchemaError
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { location: loc } = useGeoLocation();
  const locationRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function getData() {
      const { data, success } = await getBusinessDetails(businessId);
      if (success) {
        setBusinessData(data);
      }
    }
    getData();
  }, [businessId]);

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const res = await updateBusinessDetails(formData);
    const { success, data, errors } = res;

    if (success) {
      setBusinessData(data);
    } else {
      setFormErrors(errors || ({} as BusinessInfoFormSchemaError));
      console.log("Form Errors:", errors);
    }

    setIsSubmitting(false);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleFormSubmit(formData);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Edit Details</h3>
      </div>

      <form onSubmit={onFormSubmit}>
        <input type="hidden" name="businessId" value={businessId} />
        <div className="p-6.5">
          {/* Reviews & Rating */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            {/* Reviews */}
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Reviews
              </label>
              <input
                name="reviews"
                type="text"
                placeholder="No of Reviews"
                defaultValue={businessData?.reviews}
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.reviews,
                    "border-red-500": formErrors.reviews,
                  }
                )}
              />
              {formErrors.reviews && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.reviews._errors[0]}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Rating
              </label>
              <input
                name="rating"
                type="text"
                defaultValue={businessData?.rating}
                placeholder="Enter rating (ex 4.9/5)"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.rating,
                    "border-red-500": formErrors.rating,
                  }
                )}
              />
              {formErrors.rating && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.rating._errors[0]}
                </p>
              )}
            </div>
          </div>

          {/* URL & Date */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Review/Rating URL
              </label>
              <input
                name="reviewRatingUrl"
                type="text"
                defaultValue={businessData?.reviewRatingUrl}
                placeholder="Review/Rating URL"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.reviewRatingUrl,
                    "border-red-500": formErrors.reviewRatingUrl,
                  }
                )}
              />
              {formErrors.reviewRatingUrl && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.reviewRatingUrl._errors[0]}
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/2">
              <DatePickerOne
                name="establishedOn"
                defaultDate={
                  businessData?.establishedOn
                    ? new Date(businessData.establishedOn)
                    : new Date()
                }
                label="Established on"
              />
            </div>
          </div>

          {/* Location & Phone */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            {/* Location */}
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Location
              </label>
              <input
                ref={locationRef}
                name="geolocation"
                type="text"
                value={businessData?.geolocation}
                defaultValue={loc}
                // onChange={(e) => setGeolocation(e.target.value)}
                placeholder="Location coordinates"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.geolocation,
                    "border-red-500": formErrors.geolocation,
                  }
                )}
              />
              {formErrors.geolocation && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.geolocation._errors[0]}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                defaultValue={businessData?.phone}
                placeholder="Phone Number"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.phone,
                    "border-red-500": formErrors.phone,
                  }
                )}
              />
              {formErrors.phone && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.phone._errors[0]}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Brief Intro
            </label>
            <textarea
              rows={4}
              name="bio"
              defaultValue={businessData?.bio}
              placeholder="Type your message"
              className="mb-3 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>

            {/* Social Fields */}
            <fieldset className="rounded border border-gray-300 px-5 py-3">
              <legend>Social</legend>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Facebook Page
                  </label>
                  <input
                    name="socialProfiles['facebook']"
                    type="url"
                    defaultValue={businessData?.socialProfiles?.facebook}
                    placeholder="Facebook Page"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Instagram Page
                  </label>
                  <input
                    name="socialProfiles['instagram']"
                    type="url"
                    defaultValue={businessData?.socialProfiles?.instagram}
                    placeholder="Instagram Page"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Youtube Page
                  </label>
                  <input
                    name="socialProfiles['youtube']"
                    type="url"
                    defaultValue={businessData?.socialProfiles?.youtube}
                    placeholder="Youtube Page"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    X (Twitter) Page
                  </label>
                  <input
                    name="socialProfiles['twitter']"
                    type="url"
                    defaultValue={businessData?.socialProfiles?.twitter}
                    placeholder="Twitter page"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          {/* Buttons */}
          <div className="flex">
            <button
              type="button"
              className="rounded bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90"
              onClick={() => setFormErrors({} as BusinessInfoFormSchemaError)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "ml-auto rounded bg-primary px-10 py-4 font-medium text-gray hover:bg-opacity-90",
                {
                  "opacity-50 cursor-not-allowed": isSubmitting,
                }
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;

