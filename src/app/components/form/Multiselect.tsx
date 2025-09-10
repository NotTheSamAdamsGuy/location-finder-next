import { useState } from "react";

export type MultiselectOption = {
  optionText: string;
  value: string;
};

export default function Multiselect({
  options,
  formFieldValue,
  onChange,
}: {
  options: MultiselectOption[];
  formFieldValue: string;
  onChange: (selectedOptions: string[]) => void;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const option = evt.target.value;

    const selectedOptionSet = new Set<string>(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const dropdownMessage = `${selectedOptions.length} ${formFieldValue}${selectedOptions.length === 0 || selectedOptions.length > 1 ? "s" : ""} selected`;

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />

      <div className="select w-full" tabIndex={0}>
        {dropdownMessage}
      </div>

      <div className="hidden peer-checked:flex absolute w-full bg-white shadow p-2">
        <ul>
          {options.map((option, i) => {
            return (
              <li key={option.value}>
                <label className="label flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                  <input
                    type="checkbox"
                    name={formFieldValue}
                    value={option.value}
                    className="cursor-pointer checkbox"
                    onChange={handleChange}
                  />
                  <span className="ml-1">{option.optionText}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
}
