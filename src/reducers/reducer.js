import { combineReducers } from "redux";
import { SET_PRODUCTS } from "../constants/types";

const initialProductsState = [
  {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
];

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
