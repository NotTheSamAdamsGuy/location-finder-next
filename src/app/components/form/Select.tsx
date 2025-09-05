import { SelectOption } from "@/app/lib/definitions";

export default function Select({
  options,
  name,
  id,
  defaultValue = "Pick a value",
}: {
  options: SelectOption[];
  name: string;
  id: string;
  defaultValue: string;
}) {
  const optionElements = options.map(({ key, value }) => (
    <option key={key} value={key}>
      {value}
    </option>
  ));

  return (
    <select
      defaultValue={defaultValue}
      className="select w-full"
      name={name}
      id={id}
    >
      <option disabled={true}>{defaultValue}</option>
      {optionElements}
    </select>
  );
}
