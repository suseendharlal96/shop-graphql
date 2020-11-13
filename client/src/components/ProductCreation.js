import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Form, Field } from "react-final-form";

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

  const createProd = (values) => {
    console.log(values);
    // createProduct({
    //   variables: {
    //     name: form.name,
    //     price: form.price,
    //     image: form.image,
    //     description: form.description,
    //   },
    // });
  };

  const updateProd = (values) => {
    console.log(values);
    // updateProduct({
    //   variables: {
    //     id: editProduct._id,
    //     name: form.name,
    //     price: form.price,
    //     image: form.image,
    //     description: form.description,
    //   },
    // });
  };

  const submitForm = (values) => {
    const data = {
      name: values.name,
      price: +values.price,
      image: values.image,
      description: values.description,
    };
    editProduct
      ? updateProduct({ variables: { ...data, id: editProduct._id } })
      : createProduct({ variables: data });
  };

  const requireValidation = (value) => {
    if (!value) {
      return "Required Field.";
    }
  };

  const priceValidation = (value) => {
    if (!value) {
      return "Required Field.";
    } else if (+value <= 0) {
      return "Enter a valid amount";
    }
  };

  const imageValidation = (value) => {
    const regEx = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/g;
    if (!value) {
      return "Required Field.";
    } else if (!value.match(regEx)) {
      return "Enter a valid image URL";
    }
  };

  return (
    <div className="modal-container">
      <div className="header">
        <span className="close" onClick={closeModal}>
          X
        </span>
      </div>
      {operationType !== "delete" ? (
        <Form
          initialValues={
            editProduct && {
              name: editProduct.name,
              price: editProduct.price,
              image: editProduct.image,
              description: editProduct.description,
            }
          }
          onSubmit={submitForm}
          render={({ handleSubmit, form, invalid }) => (
            <form onSubmit={handleSubmit} className="form-container">
              {JSON.stringify(form, null, 4)}
              {invalid}
              <Field name="name" validate={requireValidation}>
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="name">Product Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      id="name"
                      // value={form.name}
                      // onChange={changeInputHandler}
                      {...input}
                    />
                    {meta.error && meta.touched && (
                      <p className="invalid">{meta.error}</p>
                    )}
                  </div>
                )}
              </Field>
              <Field name="price" validate={priceValidation}>
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      className="form-control"
                      type="number"
                      // name="price"
                      id="price"
                      // value={form.price}
                      // onChange={changeInputHandler}
                      {...input}
                    />
                    {meta.error && meta.touched && (
                      <p className="invalid">{meta.error}</p>
                    )}
                  </div>
                )}
              </Field>
              <Field name="image" validate={imageValidation}>
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="image">Image url</label>
                    <input
                      className="form-control"
                      type="text"
                      // name="image"
                      {...input}
                      id="image"
                      // value={form.image}
                      // onChange={changeInputHandler}
                    />
                    {meta.error && meta.touched && (
                      <p className="invalid">{meta.error}</p>
                    )}
                  </div>
                )}
              </Field>
              <Field name="description" validate={requireValidation}>
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      // name="description"
                      {...input}
                      rows="10"
                      cols="20"
                      id="description"
                      // value={form.description}
                      // onChange={changeInputHandler}
                    />
                    {meta.error && meta.touched && (
                      <p className="invalid">{meta.error}</p>
                    )}
                  </div>
                )}
              </Field>
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
                <button type="submit" className="btn-cart" disabled={invalid}>
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
          )}
        ></Form>
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
