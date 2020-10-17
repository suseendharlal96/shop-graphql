import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import "./ProductCreation.scss";

const ProductCreation = ({
  id,
  operationType,
  closeModal,
  editProduct,
  confirmDeleted,
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const changeInputHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [deleteProduct, { loading: deleteLoading }] = useMutation(
    DELETE_PRODUCT,
    {
      onCompleted(data) {
        console.log(data);
        confirmDeleted();
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const deleteProd = () => {
    deleteProduct({ variables: { id } });
  };

  return (
    <div className="modal-container">
      <div className="header">
        <span className="close" onClick={closeModal}>
          X
        </span>
      </div>
      {operationType !== "delete" ? (
        <form className="form-container">
          <div>
            <label htmlFor="name">Product Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              value={
                editProduct && editProduct.name ? editProduct.name : form.name
              }
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              id="price"
              value={
                editProduct && editProduct.price
                  ? editProduct.price
                  : form.price
              }
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="image">Image url</label>
            <input
              className="form-control"
              type="text"
              name="image"
              id="image"
              value={
                editProduct && editProduct.image
                  ? editProduct.image
                  : form.image
              }
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="10"
              cols="20"
              id="description"
              value={
                editProduct && editProduct.description
                  ? editProduct.description
                  : form.description
              }
              onChange={changeInputHandler}
            />
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button className="btn-cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn-cart">Save</button>
          </div>
        </form>
      ) : (
        <div className="delete-container">
          <div className="content">
            <h3>Are u sure want to delete</h3>
            <div className="btn-container">
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-delete" onClick={deleteProd}>
                {deleteLoading ? "Deleting.." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export default ProductCreation;
