import React from "react";
import { render } from "@testing-library/react";
import Products from "./page";

test("checks if the div with text Products is present", () => {
    const { getByText } = render(<Products />);
    const divElement = getByText(/Products/i);
    expect(divElement).toBeInTheDocument();
});
