import { useState } from "react";
import {
  default as ReactSelect,
  components,
  OptionProps,
  MultiValue,
} from "react-select";
import { FILTER_DD_TYPE as OptionType } from "@/types/business";

const MyOption = (props: OptionProps<OptionType>) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};
interface Props {
  allOptions: OptionType[];
  onChange: (arg: MultiValue<OptionType>) => void;
  placeholder?: string;
  name?: string;
  defaultValue?: MultiValue<OptionType>;
}

function ReactSelectMultiSelect({
  allOptions = [],
  onChange,
  placeholder,
  name,
  defaultValue,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<MultiValue<OptionType>>(
    [],
  );

  const handleChange = (selected: MultiValue<OptionType>) => {
    setSelectedOption(selected);
    onChange(selected);
  };

  return (
    <ReactSelect
      name={name}
      placeholder={placeholder}
      className="min-w-50"
      options={allOptions}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option: MyOption }}
      onChange={handleChange}
      value={selectedOption}
      defaultValue={defaultValue}
    />
  );
}

export default ReactSelectMultiSelect;
