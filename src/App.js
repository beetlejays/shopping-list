import React from "react";
import "./App.css";

import { useEffect, useState } from "react";

export default function App() {
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

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
          onChange={handleSubmit}
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

      <ul>
        {shoppingList.map((item) => (
          <button type="button" key={item._id}>
            {item.name.en}
          </button>
        ))}{" "}
      </ul>

      <div className="tags">
        {productList
          .filter((product) =>
            product.name.en.toLowerCase().includes(productSearch)
          )
          .map((product) => (
            <button
              type="button"
              key={product._id}
              onClick={() => selectProduct(product)}
            >
              {product.name.en}
            </button>
          ))}
      </div>
    </div>
  );

  /////////////// Handles Form Input

  function handleSubmit(event) {
    event.preventDefault();
    setProductSearch(event.target.value);
  }

  ///////////////  Handles saved onClick items

  function selectProduct(product) {
    const foundProduct = shoppingList.filter(
      (shoppingItem) => shoppingItem._id === product._id
    );
    if (foundProduct.length === 0) {
      setShoppingList([...shoppingList, product]);
    }
    // console.log(product);
  }
}
