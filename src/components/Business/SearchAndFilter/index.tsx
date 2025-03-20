import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { MultiValue } from "react-select";
import DatePickerRange from "@/components/FormElements/DatePicker/DatePickerRange";
import FilterDropdown from "@/components/Business/SearchAndFilter/FilterDropdown";
import Select from "./ReactSelect";
import MultiSelect from "./ReactSelectMultiSelect";
import { FILTER_DD_TYPE } from "@/types/business";
import useThrottle from "@/hooks/useThrottle";

const NullField = () => null;

const FilterFieldComponent = ({
  fieldType,
  label,
  value,
  onChange,
  selectOptions = [],
}: {
  onChange: (arg: unknown) => void;
  [s: string]: unknown;
}) => {
  switch (fieldType) {
    case "dateRange":
      return (
        <DatePickerRange
          className="py-2"
          placeholder={label as string}
          name={value as string}
          onChange={(arg) => {
            const [start, end] = arg;
            onChange([
              start?.toLocaleDateString("en-CA"),
              end?.toLocaleDateString("en-CA"),
            ]);
          }}
        />
      );

    case "select":
      return (
        <Select
          placeholder={label as string}
          name={value as string}
          onChange={(arg) => {
            onChange(arg?.value);
          }}
          allOptions={selectOptions as FILTER_DD_TYPE[]}
        />
      );
    case "multiselect":
      return (
        <MultiSelect
          placeholder={label as string}
          name={value as string}
          onChange={(arg) => {
            onChange(arg?.map((obj) => obj.value));
          }}
          allOptions={selectOptions as FILTER_DD_TYPE[]}
        />
      );

    default:
      return <NullField />;
  }
};

interface Props {
  enableSearch?: boolean;
  createNewUrl?: string;
  onChange?: (arg: { [key: string]: unknown }) => void;
  tableFilterOptions?: FILTER_DD_TYPE[];
}

const SearchAndFilterBar = ({
  enableSearch = true,
  services, //addded
  createNewUrl = "",
  onChange = () => null,
  tableFilterOptions = [],
}: Props) => {
  const [enabledFilters, setEnabledFilters] = useState<
    MultiValue<FILTER_DD_TYPE>
  >([]);
  const [dataFilters, setDataFilters] = useState({ searchTerm: "" });
  const handleFilterChange = (val: MultiValue<FILTER_DD_TYPE>) => {
    console.log("activeFilters", val);
    setEnabledFilters(val);
  };

  const handleFieldChange = (v: unknown, field: unknown) => {
    //console.log(field, v);
    setDataFilters({ ...dataFilters, [field as string]: v });
  };

  const throttledChangeHandler = useThrottle(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      //console.log("Throttled Value:", event.target.value);
      setDataFilters({ ...dataFilters, searchTerm: event.target.value });
      onChange({ ...dataFilters, searchTerm: event.target.value });
    },
    300,
  );

  const applyFilter = () => {
    onChange(dataFilters);
  };

  return (
    <>
      <div className="mb-4 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="flex justify-between pb-5">
          {/* also hide on service page  */}
          {enableSearch && !services && (
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                type="text"
                onChange={throttledChangeHandler}
                className="min-w-75 rounded-md border border-stroke px-5 py-2 pl-12 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                placeholder="Search..."
                value={dataFilters?.searchTerm || ""}
              />
            </div>
          )}
          {/* second search inpute added here */}
          {services && (
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                type="text"
                onChange={throttledChangeHandler}
                className="min-w-75 rounded-md border border-stroke px-5 py-2 pl-12 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                placeholder="Search..."
                value={dataFilters?.searchTerm || ""}
              />
            </div>
          )}
          <div className="flex items-center font-medium">
            {!services && <FilterDropdown
              placeholder="Select filters"
              onChange={handleFilterChange}
              options={tableFilterOptions}
            />}
            

            {createNewUrl && (
              <Link
                href={createNewUrl || "#"}
                className="ml-2 rounded bg-secondary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
              >
                <FontAwesomeIcon icon={faCirclePlus} /> New Entry
              </Link>
            )}
          </div>
        </div>
      </div>

      {enabledFilters.length > 0 && (
        <div className="mb-4 mt-4 rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6">
          <div className="flex items-center justify-center">
            {enabledFilters.map(
              ({ fieldType, label, value, selectOptions }, i) => {
                return (
                  <div
                    className={cn("mx-2", {
                      "w-72": fieldType === "dateRange",
                    })}
                    key={i}
                  >
                    <FilterFieldComponent
                      fieldType={fieldType}
                      label={label}
                      value={value}
                      selectOptions={selectOptions}
                      onChange={(arg: unknown) => handleFieldChange(arg, value)}
                    />
                  </div>
                );
              },
            )}
            <button
              onClick={applyFilter}
              className="ml-2 rounded bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAndFilterBar;
