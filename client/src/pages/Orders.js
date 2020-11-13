import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { gql, useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";

import "./Orders.scss";

const Orders = (props) => {
  const history = useHistory();
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    if (!props.token) {
      history.push("/auth");
    } else {
      getOrders();
    }
    window.scrollTo(0, 0);
  }, []);

  const [getOrders, { loading }] = useLazyQuery(GET_ORDERS, {
    onCompleted(data) {
      setOrders(data.getOrders.products);
    },
    onError(err) {
      console.log(err);
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="cart-container">
      {loading ? (
        <p>Fetching your orders..⏳</p>
      ) : orders && orders.length > 0 ? (
        <>
          <div className="cart">
            {orders.map((c) => (
              <div key={c._id} className="cart-item">
                <h2>{c.name}</h2>
                <span style={{ color: "var(--primaryText)" }}>
                  Ordered on: {dayjs(c.date).format("MMM D, YYYY h:mm A")}
                </span>
                <p>quantity:{c.quantity}</p>
                <p className="price">{c.price * c.quantity}</p>
                <img alt={c.name} src={c.image} />
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p> No orders placed yet.🙁</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      products {
        _id
        name
        price
        image
        description
        quantity
        date
      }
    }
  }
`;

export default connect(mapStateToProps)(Orders);
