export const filterProducts = (
  products,
  searchTerm,
  categoryFilter,
  sortCriteria
) => {
  return products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter((product) =>
      sortCriteria === 0
        ? true
        : sortCriteria >= 100
        ? product.price >= 100
        : product.price < 100
    );
};
