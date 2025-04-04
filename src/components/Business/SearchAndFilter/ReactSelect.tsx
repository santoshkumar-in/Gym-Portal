import { useState } from "react";
import { default as ReactSelect, SingleValue } from "react-select";
import { FILTER_DD_TYPE as OptionType } from "@/types/business";

interface Props {
  allOptions: OptionType[];
  onChange: (arg: SingleValue<OptionType>) => void;
  placeholder?: string;
  name?: string;
  defaultValue?: SingleValue<OptionType>;
  isDisabled?: boolean;
}

function FitNxtReactSelect({
  allOptions = [],
  onChange,
  placeholder,
  name,
  defaultValue,
  isDisabled = false,
}: Props) {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>();

  const handleChange = (selected: SingleValue<OptionType>) => {
    setSelectedOption(selected);
    onChange(selected);
  };

  return (
    <ReactSelect
      isDisabled={isDisabled}
      name={name}
      placeholder={placeholder}
      className="mr-2 min-w-50"
      options={allOptions}
      closeMenuOnSelect={true}
      hideSelectedOptions={false}
      onChange={handleChange}
      value={selectedOption}
      defaultValue={defaultValue}
    />
  );
}

export default FitNxtReactSelect;
