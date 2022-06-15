import React from "react";
import "./App.css";

import { useEffect, useState } from "react";

export default function App() {
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectProduct, setSelectProduct] = useState([]);

  useEffect(() => {
    fetch("https://fetch-me.vercel.app/api/shopping/items")
      .then((response) => response.json())
      .then((productData) => {
        setProductList(productData.data);
      });
  }, []);

  return (
    <div className="App">
      <h1>What do you want to buy?</h1>

      <form>
        <label
          htmlFor="Product-Search"
          aria-labelledby="Search-Product"
        ></label>
        <input
          onChange={onHandleSubmit}
          type="text"
          id="Search-Product"
          name="product-search"
        ></input>
        <button type="submit">Search</button>
      </form>

      <hr />

      <h2>Current Shopping List</h2>
      <p>Product here</p>
      <hr />

      <h2>Shopping List</h2>

      <div className="tags">
        {productList
          .filter((product) =>
            product.name.en.toLowerCase().includes(productSearch)
          )
          .map((product) => (
            <button
              type="button"
              key={product._id}
              onClick={() => onHandleSelectProduct(product)}
            >
              {product.name.en}
            </button>
          ))}
      </div>
    </div>
  );

  //// Handles Form Input

  function onHandleSubmit(event) {
    event.preventDefault();
    setProductSearch(event.target.value);
  }

  //// Handles saved onClick items

  function onHandleSelectProduct(product) {
    console.log(product._id);
  }
}
