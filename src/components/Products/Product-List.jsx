import { debounce } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ENDPOINT } from "../../constants/types";
import { useProducts } from "../../hooks/use-product";
import { Loading } from "../Loading/Loading";
import { NotFoundPage } from "../Not-Found/NotFound";
import { ProductCard } from "../Product-Card/Product-Card";
import { filterProducts } from "./products-list-helper";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortPriceCriteria, setSortPriceCriteria] = useState(0);
  const [ascending, setAscending] = useState(true);
  const [numOfProducts, setNumOfProducts] = useState(5);
  const { loading, error } = useProducts(ENDPOINT, numOfProducts);
  const products = useSelector((state) => state.products);
  const filteredProducts = filterProducts(
    products,
    searchTerm,
    categoryFilter,
    sortPriceCriteria,
    ascending
  );
  //User interactions
  const debouncedSearch = debounce((search) => {
    setSearchTerm(search);
  }, 150);
  const onSearch = (event) => {
    if (event) {
      debouncedSearch(event.target.value);
    }
  };
  const onCategoryChange = (event) => {
    if (event) {
      setCategoryFilter(event.target.value);
    }
  };

  const onSortByPriceChange = (event) => {
    if (event) {
      setSortPriceCriteria(event.target.value);
    }
  };

  const onSortToggle = () => {
    setAscending(!ascending);
  };

  const onMoreProductsClicked = () => {
    setNumOfProducts((prevPageNumber) => prevPageNumber + 5);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5">
        Looking for awesome products!!
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={onSearch}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        />
        <select
          value={categoryFilter}
          onChange={onCategoryChange}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        >
          <option value="">All Categories</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="electronics">Electronics</option>
        </select>
        <select
          value={sortPriceCriteria}
          onChange={onSortByPriceChange}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        >
          <option value="0">All</option>
          <option value="100">More than 100</option>
          <option value="99">less than 100</option>
        </select>
        <button
          onClick={onSortToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        >
          {ascending ? "low to high" : "high to low"}
        </button>
      </div>
      {filteredProducts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NotFoundPage />
      )}
      {!searchTerm && (
        <button
          onClick={onMoreProductsClicked}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Load more
        </button>
      )}
    </div>
  );
};
