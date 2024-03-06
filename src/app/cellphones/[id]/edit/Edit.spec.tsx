import React from "react";
import { render } from "@testing-library/react";
import Edit from "./page";

test("checks if the div with text Edit is present", () => {
    const { getByText } = render(<Edit />);
    const divElement = getByText(/Edit/i);
    expect(divElement).toBeInTheDocument();
});
