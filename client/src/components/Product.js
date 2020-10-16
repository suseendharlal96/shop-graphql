import React, { useState } from "react";

import "./Product.scss";

const Product = ({ product, sampleFunc }) => {
  const [val, setVal] = useState(1);
  return (
    <div className="product-container">
      <h2>{product.name}</h2>
      <p className="price">{product.price}</p>
      <img src={product.image} />
      <p>{product.description}</p>
      {/* <div class="btn-container" *ngIf="token !== ''">
          <button
            (click)="deleteProd(product)"
            *ngIf="creator !== '' && product.creator === creator"
            class="btn-delete"
          >
            Delete
          </button>
          <button
            (click)="edit(product)"
            *ngIf="creator !== '' && product.creator === creator"
            class="btn-edit"
          >
            Edit
          </button>
          <button (click)="addCart(product)" class="btn-cart">Add to cart</button>
        </div> */}
    </div>
  );
};

export default Product;
