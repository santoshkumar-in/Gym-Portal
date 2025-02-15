import { useState } from "react";
import { default as ReactSelect, SingleValue } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const optionValues = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "OTHER", label: "Other" },
];

function FitNxtReactSelect() {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>();

  const handleChange = (selected: SingleValue<OptionType>) => {
    setSelectedOption(selected);
  };

  return (
    <ReactSelect
      className="mr-2 min-w-50"
      options={optionValues}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      onChange={handleChange}
      value={selectedOption}
    />
  );
}

export default FitNxtReactSelect;
