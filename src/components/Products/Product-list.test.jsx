import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useProducts } from "../../hooks/use-product";
import { Products } from "./Product-List";

jest.mock("../../hooks/use-product.js");
const mockUseProducts = jest.mocked(useProducts);

describe("Products Component", () => {
  let mockStore;
  let initialState;

  beforeEach(() => {
    mockUseProducts.mockReturnValue({ loading: false, error: false });

    mockStore = configureStore([]);
    initialState = {
      products: [
        { id: 1, title: "Product 1", category: "Jewelery", price: 100 },
        { id: 2, title: "Product 2", category: "Men's clothing", price: 50 },
        { id: 3, title: "Product 3", category: "Electronics", price: 150 },
      ],
    };
  });

  it("renders without crashing", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
  });
  it("renders spinner", () => {
    mockUseProducts.mockReturnValue({ loading: true, error: false });
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(getByTestId("spinner")).toBeInTheDocument();
  });

  it("displays products correctly", () => {
    const store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
    expect(getByText("Product 3")).toBeInTheDocument();
  });

  it("filters products based on search term", async () => {
    const store = mockStore(initialState);
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    const searchInput = getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Product 1" } });
    expect(getByText("Product 1")).toBeInTheDocument();
  });
  it("displays Not Found page when calling api failed ", () => {
    mockUseProducts.mockReturnValue({ loading: false, error: true });
    const store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    expect(getByText("Not Found")).toBeInTheDocument();
  });
  it("displays Not Found page when there is no product founded ", async () => {
    const store = mockStore(initialState);
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    const searchInput = getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Product 4" } });
    await waitFor(() => {
      expect(getByText("Not Found")).toBeInTheDocument();
    });
  });
});
