import React from "react";
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import "./styles.css";

const Home = () => {
  const { state, productState } = CartState();

  const transformProducts = () => {
    let sortedProducts = state.products;

    if (productState.sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        productState.sort === "lowToHigh"
          ? a.price - b.price
          : b.price - a.price
      );
    }

    if (!productState.byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (productState.byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (productState.byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= productState.byRating
      );
    }

    if (productState.searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(productState.searchQuery)
      );
    }
    return sortedProducts;
  };

  return (
    <div className="home">
      {<Filters />}
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
