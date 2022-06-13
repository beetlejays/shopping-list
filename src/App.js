import React from "react";
import "./App.css";

import { useEffect, useState } from "react";

export default function App() {
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  // const [productSelected, setProductSelected] = useState([]);
  const [selectProduct, setSelectProduct] = useState(false);

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

      <h2>Shopping List</h2>

      <div className="tags">
        {productList
          .filter((product) =>
            product.name.en.toLowerCase().includes(productSearch)
          )
          .map((product) => (
            <button type="button">{product.name.en}</button>
          ))}
      </div>
    </div>
  );

  //// Handles Form Input

  function onHandleSubmit(event) {
    event.preventDefault();
    setProductSearch(event.target.value);
  }

  //// Handles onClick Tags

  function handleSelectProduct() {
    setSelectProduct(!selectProduct);
  }
}
