import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface Props {
  businessId: string;
  services: { serviceMappingId: string; serviceName: string }[];
  onDelete: (id: string) => void;
}

const BusinessServices = ({ onDelete, services }: Props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                Service Name
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.serviceMappingId}
                className="border-b border-[#eee] dark:border-strokedark"
              >
                <td className="px-4 py-5 text-black dark:text-white">
                  {service.serviceName}
                </td>
                <td className="px-4 py-5">
                  <button
                    onClick={() => onDelete(service.serviceMappingId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessServices;
