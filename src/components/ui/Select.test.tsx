import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Select from "./Select";

test("Select component", () => {
  const options = [
    { key: "key1", value: "value1"},
    { key: "key2", value: "value2"}
  ];
  render(<Select options={options} name={"select"} id={"select"} defaultValue={"Select a value"} />);
  const selectEl = screen.getByTestId("select");
  expect(selectEl).toBeDefined();

  const option0 = selectEl.children[0] as HTMLOptionElement;
  const option1 = selectEl.children[1] as HTMLOptionElement;
  const option2 = selectEl.children[2] as HTMLOptionElement;

  expect(option0.text).toEqual("Select an option");
  expect(option0.disabled).toEqual(true);
  expect(option1.value).toEqual("key1");
  expect(option1.text).toEqual("value1");
  expect(option2.value).toEqual("key2");
  expect(option2.text).toEqual("value2");
});