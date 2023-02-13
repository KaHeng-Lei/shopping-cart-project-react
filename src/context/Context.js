import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducer";

// create a context that components can provide or read.
// returns a context object
const Cart = createContext();

// only render one type of data;
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(640, 480, true),
    inStock: faker.datatype.number({ min: 0, max: 20 }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.datatype.number({ min: 1, max: 5 }),
  }));

  //consolidate state update logic,
  //here we have products and shopping cart
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  //for the filters section
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  //use Provider here to specify the context value that all children components can use
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

//export this Component so pass information to any wrapped inside components
//call this inside index.js and wrap the whole app
export default Context;

export const CartState = () => {
  //call useContext to read the context value
  //the return context value here is the {state, dispatch} passed in the Provider.
  return useContext(Cart);
};
