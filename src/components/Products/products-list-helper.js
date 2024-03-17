export const filterProducts = (
  products,
  searchTerm,
  categoryFilter,
  sortPriceCriteria,
  ascending
) => {
  return products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter((product) =>
      sortPriceCriteria === 0
        ? true
        : sortPriceCriteria >= 100
        ? product.price >= 100
        : product.price < 100
    )
    .sort((a, b) => {
      const sortOrder = ascending ? -1 : 1;
      return sortOrder * (a.price - b.price);
    });
};
