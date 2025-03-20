import { useState, useEffect } from "react";
import { getAllServices } from "@/actions/business";
import { MASTER_SERVICE_CATEGORY, MASTER_SERVICE } from "@/types/business";

const ServiceSelection = ({
  onSelectServices,
}: {
  onSelectServices: (serviceIds: string[]) => void;
}) => {
  const [categories, setCategories] = useState<MASTER_SERVICE_CATEGORY[]>([]);
  const [selectedServices, setSelectedServices] = useState<MASTER_SERVICE[]>(
    [],
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const { data, success } = await getAllServices();
      console.log(data, success);
      if (success) {
        setCategories(data as MASTER_SERVICE_CATEGORY[]);
      }
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  const toggleServiceSelection = (service: MASTER_SERVICE) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some((s) => s.id === service.id);
      const updatedSelection = isSelected
        ? prevSelected.filter((s) => s.id !== service.id)
        : [...prevSelected, service];
      onSelectServices(updatedSelection.map((s) => s.id));

      return updatedSelection;
    });
  };

  const removeService = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((s) => s.id !== serviceId),
    );
  };

  return (
    <div className="relative w-full">
      <div
        className="flex cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-900 "
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {selectedServices.length > 0 ? (
          selectedServices.map((service) => (
            <span
              key={service.id}
              className="flex items-center rounded-full bg-green-500 px-3 py-1 text-sm text-white "
            >
              {service.value}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeService(service.id);
                }}
                className="ml-2 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 hover:text-gray-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.225 4.811a.75.75 0 011.06 0L12 9.526l4.715-4.715a.75.75 0 111.06 1.06L13.061 10.5l4.714 4.715a.75.75 0 11-1.06 1.06L12 11.561l-4.715 4.714a.75.75 0 11-1.06-1.06L10.939 10.5 6.225 5.785a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Select services...
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="ml-auto h-5 w-5 text-gray-600 dark:text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M4.5 8.25a.75.75 0 011.06 0L12 14.69l6.44-6.44a.75.75 0 011.06 1.06l-7 7a.75.75 0 01-1.06 0l-7-7a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isDropdownOpen && (
        <div className=" mt-2 max-h-80 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 ">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border-b p-3 dark:border-gray-700"
            >
              <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {category.value}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleServiceSelection(service)}
                    className={`rounded border px-3 py-2 text-sm transition-all ${selectedServices.some((s) => s.id === service.id)
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-gray-100 text-gray-700"
                      }`}
                  >
                    {service.value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceSelection;
