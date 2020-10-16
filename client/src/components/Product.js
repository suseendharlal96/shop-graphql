import React from "react";

import "./Product.scss";

const Product = ({ product }) => {
  return (
    <div className="product-container">
      <h2>{product.name}</h2>
      <p className="price">{product.price}</p>
      <img alt={product.name} src={product.image} />
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
