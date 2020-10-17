import React from "react";
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
  const addCart = () => {
    console.log("cart");
  };
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
              <button onClick={addCart} className="btn-cart">
                Add to cart
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

export default connect(mapStateToProps)(Product);
