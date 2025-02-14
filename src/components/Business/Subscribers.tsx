import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faCalendarPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { SUBSCRIBER } from "@/types/business";
interface Props {
  subscribers: SUBSCRIBER[];
  businessId: string;
}

const Subscribers = ({ subscribers, businessId }: Props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Mobile
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Gender
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Active Subscription
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Start date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                End Date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    <Link
                      className="text-primary"
                      href={`/business/${businessId}/subscriber/${subscriber.id}`}
                    >
                      {subscriber.name}
                    </Link>
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {subscriber.mobile}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {subscriber.gender}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {subscriber.subscription}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {subscriber.startDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {subscriber.endDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="w-4 hover:text-primary">
                      <FontAwesomeIcon icon={faRepeat} />
                    </button>
                    <button className="w-4 hover:text-primary">
                      <FontAwesomeIcon icon={faCalendarPlus} />
                    </button>
                    <button className="w-4 hover:text-primary">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
