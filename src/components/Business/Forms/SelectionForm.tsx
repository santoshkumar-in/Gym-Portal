
import { useState, useEffect } from "react";
import { getAllServices } from "@/actions/business";

interface Service {
    id: string;
    value: string;
}

interface Category {
    id: string;
    value: string;
    services: Service[];
}

const ServiceSelection = ({
    onSelectServices,
}: {
    onSelectServices: (serviceIds: string[]) => void;
}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        try {
            const res = await getAllServices();
            setCategories(res.categories || []);
        } catch (error) {
            console.error("Failed to fetch services", error);
        }
    };

    const toggleServiceSelection = (service: Service) => {
        setSelectedServices((prevSelected) => {
            const isSelected = prevSelected.some((s) => s.id === service.id);
            return isSelected
                ? prevSelected.filter((s) => s.id !== service.id)
                : [...prevSelected, service];
        });
    };

    const removeService = (serviceId: string) => {
        setSelectedServices((prevSelected) =>
            prevSelected.filter((s) => s.id !== serviceId)
        );
    };

    const handleSubmit = () => {
        const selectedServiceIds = selectedServices.map((service) => service.id);
        onSelectServices(selectedServiceIds);
        setSelectedServices([]);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative w-full max-w-lg">
            <div
                className="flex items-center flex-wrap gap-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-3 rounded-lg shadow-md cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                {selectedServices.length > 0 ? (
                    selectedServices.map((service) => (
                        <span
                            key={service.id}
                            className="flex items-center bg-blue-600 text-white px-3 py-1 text-sm rounded-full"
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
                                    className="w-4 h-4 hover:text-gray-200"
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
                    className="w-5 h-5 ml-auto text-gray-600 dark:text-gray-400"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.5 8.25a.75.75 0 011.06 0L12 14.69l6.44-6.44a.75.75 0 011.06 1.06l-7 7a.75.75 0 01-1.06 0l-7-7a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {isDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                    {categories.map((category) => (
                        <div key={category.id} className="p-3 border-b dark:border-gray-700">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {category.value}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {category.services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => toggleServiceSelection(service)}
                                        className={`px-3 py-2 rounded border transition-all text-sm 
                                            ${selectedServices.some((s) => s.id === service.id)
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-gray-100 text-gray-700 border-gray-300"
                                            }`}
                                    >
                                        {service.value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="p-3 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceSelection;
