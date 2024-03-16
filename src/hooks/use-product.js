import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../reducers/reducer";

const useProducts = (endpoint, numOfProducts) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      try {
        const response = await fetch(endpoint + `?limit=${numOfProducts}`);
        const data = await response.json();
        const products = data;
        dispatch(setProducts(products));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchProductsFromAPI();
  }, [dispatch, endpoint, numOfProducts]);

  return { loading, error };
};

export default useProducts;
