"use client";
import { useRef, useEffect, useState } from "react";
import { updateBusinessDetails, getBusinessDetails } from "@/actions/business";
import useGeoLocation from "@/hooks/useGeoLocation";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { BUSINESS } from "@/types/business";

interface BasicInfoFormProps {
  businessId: string;
}

const BasicInfoForm = ({ businessId }: BasicInfoFormProps) => {
  const [businessData, setBusinessData] = useState<BUSINESS | undefined>(
    {} as BUSINESS,
  );
  useEffect(() => {
    async function getData() {
      const { data, success } = await getBusinessDetails(businessId);
      if (success) {
        setBusinessData(data);
      }
    }
    getData();
  }, [businessId]);

  const { location: loc } = useGeoLocation();
  const locationRef = useRef(null);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Edit Details</h3>
      </div>
      <form action={updateBusinessDetails}>
        <input type="hidden" name="businessId" value={businessId} />
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Reviews
              </label>
              <input
                name="reviews"
                type="text"
                placeholder="No of Reviews"
                defaultValue={businessData?.reviews}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Rating
              </label>
              <input
                name="rating"
                type="text"
                defaultValue={businessData?.rating}
                placeholder="Enter rating (ex 4.9/5)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
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
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <DatePickerOne
                name="establishedOn"
                value={businessData?.establishedOn}
                label="Established on"
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                placeholder="Location coordinates"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                defaultValue={businessData?.phone}
                placeholder="Phone Number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    X(Formerly Twitter) Page
                  </label>
                  <input
                    name="socialProfiles['twitter']"
                    type="url"
                    defaultValue={businessData?.socialProfiles?.twitter}
                    placeholder="Twitter page"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </fieldset>
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
