import React from "react";
import { render } from "@testing-library/react";
import Login from "./page";

test("checks if the div with text Login is present", () => {
    const { getByText } = render(<Login />);
    const divElement = getByText(/Login/i);
    expect(divElement).toBeInTheDocument();
});
