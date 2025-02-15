import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { CURRENT_USER } from "@/types/auth";

const businessUsers: CURRENT_USER[] = [
  {
    firstName: "Test User",
    email: "test@email.com",
    mobile: "+91 678994494",
    status: "Active",
  },
  {
    firstName: "John Doe",
    email: "john@email.com",
    mobile: "+91 9349987494",
    status: "Active",
  },
  {
    firstName: "Emily clarke",
    email: "emily@abc.com",
    mobile: "+91 099354494",
    status: "Active",
  },
  {
    firstName: "Marina",
    email: "ma@test.com",
    mobile: "+91 90994744",
    status: "Active",
  },
];

const BusinessUsers = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
              Name
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
          {businessUsers.map((user, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  {user.firstName}
                </h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{user.email}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{user.mobile}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <SwitcherThree />
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="w-4 hover:text-primary">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <button className="w-4 hover:text-primary">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessUsers;
