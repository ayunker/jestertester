/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import Component from "./component";
import camelcaseKeys from "camelcase-keys";

it("App Router: Works with Client Components (React State)", () => {
  console.log("👋", camelcaseKeys({ "one-two": 12, "three-four": 34 }));
  render(<Component />);
  expect(screen.getByRole("heading")).toHaveTextContent("0");
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("heading")).toHaveTextContent("1");
});
