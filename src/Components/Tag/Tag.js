import React from "react";

export default function Tag({ products, productSearch, onClick, className }) {
  return (
    <div className="tags">
      {products
        .filter((product) =>
          product.name.en.toLowerCase().includes(productSearch)
        )
        .map((product) => (
          <button
            type="button"
            className={className}
            key={product._id}
            onClick={onClick}
          >
            {product.name.en}
          </button>
        ))}
    </div>
  );
}
