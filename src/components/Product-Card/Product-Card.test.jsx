import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { ProductCard } from "./Product-Card";

describe("ProductCard", () => {
  const product = {
    title: "Test Product",
    description: "This is a test product",
    category: "Test Category",
    image: "test.jpg",
    price: 10,
  };

  it("renders product card correctly", () => {
    const { getByText, getByAltText } = render(
      <ProductCard product={product} />
    );
    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("This is a test product")).toBeInTheDocument();
    expect(getByText("Test Category")).toBeInTheDocument();
    expect(getByText("$10")).toBeInTheDocument();
    expect(getByAltText("Test Product")).toBeInTheDocument();
  });
});
