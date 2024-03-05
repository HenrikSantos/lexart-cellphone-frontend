import React from "react";
import { render } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

test("checks if the div with text RegisterForm is present", () => {
    const { getByText } = render(<RegisterForm />);
    const divElement = getByText(/RegisterForm/i);
    expect(divElement).toBeInTheDocument();
});
