import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  initialData?: string[];
}
const ServicesForm = ({ initialData = [] }: Props) => {
  const [services, setServices] = useState<string[]>([]);
  useEffect(() => {
    setServices(initialData);
  }, [initialData]);

  const addService = () => {
    setServices([...services, ""]);
  };

  const removeService = (index: number) => {
    const existingLength = services.length;
    setServices([
      ...services.slice(0, index),
      ...services.slice(index + 1, existingLength),
    ]);
  };

  const servicesHTML = (services || []).map((service, i) => {
    return (
      <li key={i} className="mb-4 list-outside list-decimal">
        <div className="flex items-center">
          <input
            name={`services[]`}
            type="text"
            placeholder="Enter Service"
            defaultValue={service}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          {services.length - 1 != i && (
            <span
              onClick={() => removeService(i)}
              className="ml-2 cursor-pointer text-2xl"
            >
              <FontAwesomeIcon icon={faCircleMinus} />
            </span>
          )}
          {services.length - 1 === i && (
            <span onClick={addService} className="ml-2 cursor-pointer text-2xl">
              <FontAwesomeIcon icon={faCirclePlus} />
            </span>
          )}
        </div>
      </li>
    );
  });
  return (
    <ol type="1" className="ml-5">
      {servicesHTML}
    </ol>
  );
};

export default ServicesForm;
