import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { BUSINESS_USER } from "@/types/business";
interface Props {
  users: BUSINESS_USER[];
  businessId: string;
  onDelete: (id: string) => void;
  onStatusChange: (
    arg: React.ChangeEvent<HTMLInputElement>,
    userId: string,
  ) => void;
}

const BusinessUsers = ({
  users,
  businessId,
  onDelete,
  onStatusChange,
}: Props) => {
  // console.log(users)
  return (
    <div className="rounded-sm border border-stroke bg-red-900 bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Full Name
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                Username
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Mobile
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.fullName || "N/A"}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.userName || "N/A"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.email || "N/A"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.mobile || "N/A"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <SwitcherThree
                    name="status"
                    // defaultChecked={user.status === "ACTIVE"}
                    defaultChecked={user.enabled} // True = active, False = inactive
                    onChange={(e) => onStatusChange(e, user.businessid || "")}
                  />
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      href={`/business/${businessId}/user/${user.userId}/update`}
                      className="w-4 hover:text-primary"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <button
                      onClick={() => user.userId && onDelete(user.userId)}
                      className="w-4 hover:text-primary"
                    >
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

export default BusinessUsers;
