import React from "react";
import { render } from "@testing-library/react";
import EditProductForm from "./EditProductForm";

test("checks if the div with text EditProductForm is present", () => {
    const { getByText } = render(<EditProductForm />);
    const divElement = getByText(/EditProductForm/i);
    expect(divElement).toBeInTheDocument();
});
