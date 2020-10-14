import React from "react";
import { connect } from "react-redux";

import { useQuery, gql } from "@apollo/client";

import * as action from "../store/actions/index";

const Products = (props) => {
  const { loading, data, error } = useQuery(GET_PRODUCTS, {
    onCompleted(data) {
      props.storeProducts(data.getProducts);
    },
    onError(error) {
      // props.storeError(data.getProducts);
      console.log(error);
    },
  });
  return (
    <>
      {loading ? (
        <p>Loading..</p>
      ) : (
        <div>
          {props.products &&
            props.products.map((product) => <p>{product.name}</p>)}
        </div>
      )}
    </>
  );
};
const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      _id
      name
      price
      image
      description
      creator
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeProducts: (products) => dispatch(action.storeProducts(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
