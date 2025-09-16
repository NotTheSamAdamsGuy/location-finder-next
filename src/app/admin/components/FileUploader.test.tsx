import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import FileUploader from "./FileUploader";

test("FileUploader component", () => {
  render(<FileUploader inputName={"images"} multiple={false} />);
  const fileUploader = screen.getByTestId("FileUploader");
  expect(fileUploader).toBeDefined();
});