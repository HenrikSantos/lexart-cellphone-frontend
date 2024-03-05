import React from "react";
import { render } from "@testing-library/react";
import Register from "./page";

test("checks if the div with text Register is present", () => {
    const { getByText } = render(<Register />);
    const divElement = getByText(/Register/i);
    expect(divElement).toBeInTheDocument();
});
