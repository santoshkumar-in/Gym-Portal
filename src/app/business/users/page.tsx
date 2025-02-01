import { Metadata } from "next";
import Users from "@/components/Tables/BusinessUsers";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";

export const metadata: Metadata = {
  title: "NFitNxt",
  description: "",
};

const BusinessUsers = () => {
  return (
    <DefaultLayout>
      <Modal modalIsOpen={false}>
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Your Message Sent Successfully
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <p className="mb-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the Industry&apos;s standard dummy text
          ever since
        </p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
              View Details
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-10">
        <Users />
      </div>
    </DefaultLayout>
  );
};

export default BusinessUsers;
