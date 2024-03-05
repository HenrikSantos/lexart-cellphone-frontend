import React from "react";
import { render } from "@testing-library/react";
import AddProductForm from "./AddProductForm";

test("checks if the div with text AddProductForm is present", () => {
    const { getByText } = render(<AddProductForm />);
    const divElement = getByText(/AddProductForm/i);
    expect(divElement).toBeInTheDocument();
});
