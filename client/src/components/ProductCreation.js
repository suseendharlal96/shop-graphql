import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import "./ProductCreation.scss";
import { productFragment } from "../util/productFragment";

const ProductCreation = ({
  id,
  operationType,
  closeModal,
  editProduct,
  operationDone,
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const changeInputHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "price") {
      value = +e.target.value;
    }
    setForm({ ...form, [e.target.name]: value });
  };

  const [deleteProduct, { loading: deleteLoading }] = useMutation(
    DELETE_PRODUCT,
    {
      onCompleted(data) {
        console.log(data);
        operationDone();
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const [createProduct, { loading }] = useMutation(ADD_PRODUCT, {
    onCompleted(data) {
      operationDone();
    },
    onError(err) {
      console.log(err);
    },
  });

  const [updateProduct, { loading: editLoading }] = useMutation(
    UPDATE_PRODUCT,
    {
      onCompleted(data) {
        operationDone();
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const deleteProd = () => {
    deleteProduct({ variables: { id } });
  };

  const createProd = () => {
    createProduct({
      variables: {
        name: form.name,
        price: form.price,
        image: form.image,
        description: form.description,
      },
    });
  };

  const updateProd = () => {
    updateProduct({
      variables: {
        id: editProduct._id,
        name: form.name,
        price: form.price,
        image: form.image,
        description: form.description,
      },
    });
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
              value={form.name}
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
              value={form.price}
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
              value={form.image}
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
              value={form.description}
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
            <button
              type="button"
              className="btn-cart"
              onClick={editProduct ? updateProd : createProd}
            >
              {editProduct
                ? editLoading
                  ? "Saving.."
                  : "Save"
                : loading
                ? "Creating.."
                : "Create"}
            </button>
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

const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $price: Int!
    $image: String!
    $description: String!
  ) {
    addProduct(
      name: $name
      price: $price
      image: $image
      description: $description
    ) {
      ...productInfo
    }
  }
  ${productFragment}
`;

const UPDATE_PRODUCT = gql`
  mutation updateProd(
    $id: ID!
    $name: String!
    $image: String!
    $price: Int!
    $description: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      image: $image
      price: $price
      description: $description
    ) {
      ...productInfo
    }
  }
  ${productFragment}
`;

export default ProductCreation;
