import cn from "classnames";
import { useState } from "react";
import {
  default as ReactSelect,
  components,
  OptionProps,
  MultiValue,
} from "react-select";
import { FILTER_DD_TYPE } from "@/types/business";

const MyOption = (props: OptionProps<FILTER_DD_TYPE>) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};

interface Props {
  className?: string;
  options?: FILTER_DD_TYPE[];
  defaultValue?: FILTER_DD_TYPE[];
  onChange: (selected: MultiValue<FILTER_DD_TYPE>) => void;
  placeholder?: string;
}
const BusinessDetails = ({
  className = "",
  options = [],
  defaultValue = [],
  onChange,
  placeholder = "Select...",
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<
    MultiValue<FILTER_DD_TYPE>
  >([]);

  const handleChange = (selected: MultiValue<FILTER_DD_TYPE>) => {
    setSelectedOption(selected);
    onChange(selected);
  };

  return (
    <ReactSelect
      className={cn({ "min-w-50": !className }, className)}
      options={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option: MyOption }}
      onChange={handleChange}
      defaultValue={defaultValue}
      value={selectedOption}
      placeholder={placeholder}
    />
  );
};

export default BusinessDetails;
