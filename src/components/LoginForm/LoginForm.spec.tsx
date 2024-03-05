import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("checks if the div with text LoginForm is present", () => {
    const { getByText } = render(<LoginForm />);
    const divElement = getByText(/LoginForm/i);
    expect(divElement).toBeInTheDocument();
});
