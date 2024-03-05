import React from "react";
import { render } from "@testing-library/react";
import ProductList from "./ProductList";

test("checks if the div with text ProductList is present", () => {
    const { getByText } = render(<ProductList />);
    const divElement = getByText(/ProductList/i);
    expect(divElement).toBeInTheDocument();
});
