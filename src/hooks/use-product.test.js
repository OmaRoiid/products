import { renderHook, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setProducts } from "../reducers/reducer";
import { useProducts } from "./use-product";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("useProducts custom hook", () => {
  beforeEach(() => {
    useDispatch.mockClear();
  });

  it("fetches products from API and dispatches action with products", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const endpoint = "/api/products";
    const numOfProducts = 10;
    const mockData = [
      { id: 1, name: "Product 1", price: "$10" },
      { id: 2, name: "Product 2", price: "$20" },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useProducts(endpoint, numOfProducts));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${endpoint}?limit=${numOfProducts}`);
      expect(mockDispatch).toHaveBeenCalledWith(setProducts(mockData));
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(false);
    });
  });

  it("handles error when fetching products", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const endpoint = "/api/products";
    const numOfProducts = 10;
    const errorMessage = "Failed to fetch products";

    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));
    const { result } = renderHook(() => useProducts(endpoint, numOfProducts));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${endpoint}?limit=${numOfProducts}`);
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(true);
    });
  });
});
