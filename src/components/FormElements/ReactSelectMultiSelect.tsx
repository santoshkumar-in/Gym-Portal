import { useState } from "react";
import {
  default as ReactSelect,
  components,
  OptionProps,
  MultiValue,
} from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const optionValues = [
  { value: "111", label: "Package 1" },
  { value: "112", label: "Package 2" },
];

const MyOption = (props: OptionProps<OptionType>) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};

function ReactSelectMultiSelect() {
  const [selectedOption, setSelectedOption] = useState<MultiValue<OptionType>>(
    [],
  );

  const handleChange = (selected: MultiValue<OptionType>) => {
    setSelectedOption(selected);
  };

  return (
    <ReactSelect
      className="min-w-50"
      options={optionValues}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option: MyOption }}
      onChange={handleChange}
      value={selectedOption}
    />
  );
}

export default ReactSelectMultiSelect;
