export type SelectOption = {
  key: string;
  value: string;
};

export default function Select({
  options,
  name,
  id,
  defaultValue = "Pick a value",
  className = ""
}: {
  options: SelectOption[];
  name: string;
  id: string;
  defaultValue: string;
  className?: string;
}) {
  const optionElements = options.map(({ key, value }) => (
    <option key={key} value={key}>
      {value}
    </option>
  ));

  return (
    <select
      defaultValue={defaultValue}
      className={`select input input-lg flex w-full ${className}`}
      name={name}
      id={id}
      data-testid="select"
    >
      <option disabled={true}>Select an option</option>
      {optionElements}
    </select>
  );
}
