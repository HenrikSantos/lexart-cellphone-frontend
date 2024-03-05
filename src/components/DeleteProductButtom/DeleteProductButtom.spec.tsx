import React from "react";
import { render } from "@testing-library/react";
import DeleteProductButtom from "./DeleteProductButtom";

test("checks if the div with text DeleteProductButtom is present", () => {
    const { getByText } = render(<DeleteProductButtom />);
    const divElement = getByText(/DeleteProductButtom/i);
    expect(divElement).toBeInTheDocument();
});
