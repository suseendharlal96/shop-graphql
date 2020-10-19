import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "./Product.scss";

const Product = ({ product, setModalContent, ...props }) => {
  const history = useHistory();
  const deleteProd = () => {
    history.push(`/delete-product/${product._id}`);
    setModalContent({ type: "delete", id: product._id });
  };

  const edit = () => {
    history.push(`/edit-product/${product._id}`);
    setModalContent({ type: "edit", id: product._id });
  };

  const [addToCart, { loading }] = useMutation(ADD_CART, {
    onCompleted(data) {
      alert("Product added to cart");
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <>
      <div className="product-container">
        <h2>{product.name}</h2>
        <p className="price">{product.price}</p>
        <img alt={product.name} src={product.image} />
        <p>{product.description}</p>
        <div className="btn-container">
          {props.id && (
            <>
              {props.id === product.creator && (
                <>
                  <button onClick={deleteProd} className="btn-delete">
                    Delete
                  </button>
                  <button onClick={edit} className="btn-edit">
                    Edit
                  </button>
                </>
              )}
              <button
                onClick={() =>
                  addToCart({ variables: { prodId: product._id } })
                }
                className="btn-cart"
              >
                {loading ? "Adding.." : "Add to cart"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.authReducer.id,
  };
};

const ADD_CART = gql`
  mutation addToCart($prodId: ID!) {
    addToCart(prodId: $prodId)
  }
`;

export default connect(mapStateToProps)(Product);
