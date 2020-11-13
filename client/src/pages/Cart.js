import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";

import "./Cart.scss";

const Cart = (props) => {
  const history = useHistory();
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    if (!props.token) {
      history.push("/auth");
    } else {
      getCart();
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cart) {
      calcTotal();
    }
  }, [cart]);

  const calcTotal = () => {
    let total = 0;
    if (cart && cart.length) {
      cart.forEach((c) => {
        total += c.price * c.quantity;
      });
      setTotal(total);
    }
  };

  const handleQuantity = (option, id) => {
    let cartCopy = [...cart];
    let cartObj = cartCopy.find((c) => c._id === id);
    let cartIndex = cartCopy.findIndex((c) => c._id === id);
    const a = { ...cartObj };
    if (option === "decrease") {
      a.quantity--;
    } else {
      a.quantity++;
    }
    cartCopy[cartIndex] = a;
    setCart(cartCopy);
  };

  const [pay, { loading: paymentLoading }] = useMutation(PAY, {
    onCompleted(data) {
      alert(data.pay);
      getCart();
    },
    onError(err) {
      console.log(err);
    },
  });

  const [getCart, { loading }] = useLazyQuery(GET_CART, {
    onCompleted(data) {
      setCart(data.getCart.products);
    },
    onError(err) {
      console.log(err);
    },
    fetchPolicy: "cache-and-network",
  });

  const [removeCart] = useMutation(REMOVE_CART, {
    onCompleted(data) {
      getCart();
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <div className="cart-container">
      {loading ? (
        <p>Fetching your cart..⏳</p>
      ) : cart && cart.length > 0 ? (
        <>
          <h3 className="total">Total:{total}</h3>
          <div className="cart">
            {cart.map((c) => (
              <div key={c._id} className="cart-item">
                <h2>{c.name}</h2>
                <p className="price">{c.price * c.quantity}</p>
                <img alt={c.name} src={c.image} />
                <p>{c.description}</p>
                <div className="cart-controls">
                  <button
                    disabled={c.quantity === 1}
                    onClick={() => handleQuantity("decrease", c._id)}
                  >
                    -
                  </button>
                  <input type="text" disabled value={c.quantity} />
                  <button onClick={() => handleQuantity("increase", c._id)}>
                    +
                  </button>
                </div>
                <div className="cart-controls">
                  <button
                    className="btn-delete"
                    onClick={() => removeCart({ variables: { prodId: c._id } })}
                  >
                    Remove
                  </button>
                  <button
                    className="primary"
                    onClick={() =>
                      pay({
                        variables: {
                          _id: c._id,
                          name: c.name,
                          price: c.price,
                          image: c.image,
                          description: c.description,
                          quantity: c.quantity,
                        },
                      })
                    }
                  >
                    {paymentLoading ? "Processing payment" : " Pay"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p> cart is empty.</p>
      )}
    </div>
  );
};

const GET_CART = gql`
  query getCart {
    getCart {
      products {
        _id
        name
        price
        image
        description
        quantity
      }
    }
  }
`;

const REMOVE_CART = gql`
  mutation removeCart($prodId: ID!) {
    removeFromCart(prodId: $prodId)
  }
`;

const PAY = gql`
  mutation pay(
    $_id: ID!
    $name: String!
    $image: String!
    $price: Int!
    $description: String!
    $quantity: Int!
  ) {
    pay(
      product: {
        id: $_id
        name: $name
        image: $image
        price: $price
        description: $description
        quantity: $quantity
      }
    )
  }
`;

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(Cart);
