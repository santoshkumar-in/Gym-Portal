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

interface Props {
  enableSearch?: boolean;
  createNewUrl?: string;
}

const optionValues = [
  {
    value: "gender",
    label: "Gender",
    fieldType: "select",
    selectOptions: [
      { value: "M", label: "Male" },
      { value: "F", label: "Female" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    value: "range",
    label: "Date Range",
    fieldType: "dateRange",
  },
  {
    value: "package",
    label: "Package",
    fieldType: "multiselect",
    selectOptions: [
      { value: "123", label: "Package 1" },
      { value: "124", label: "Package 2" },
      { value: "125", label: "Package 3ß" },
    ],
  },
];

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

const SearchAndFilterBar = ({
  enableSearch = true,
  createNewUrl = "",
}: Props) => {
  const [enabledFilters, setEnabledFilters] = useState<
    MultiValue<FILTER_DD_TYPE>
  >([]);
  const [dataFilters, setDataFilters] = useState({});
  const handleFilterChange = (val: MultiValue<FILTER_DD_TYPE>) => {
    console.log("activeFilters", val);
    setEnabledFilters(val);
  };

  const handleFieldChange = (v: unknown, field: unknown) => {
    console.log(field, v);
    setDataFilters({ ...dataFilters, field: v });
  };

  return (
    <>
      <div className="mb-4 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="flex justify-between pb-5">
          {enableSearch && (
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                type="text"
                className="min-w-75 rounded-md border border-stroke px-5 py-2 pl-12 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                placeholder="Search..."
                value=""
              />
            </div>
          )}
          <div className="flex items-center font-medium">
            <FilterDropdown
              placeholder="Select filters"
              onChange={handleFilterChange}
              options={optionValues}
            />

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
            <button className="ml-2 rounded bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90">
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAndFilterBar;
