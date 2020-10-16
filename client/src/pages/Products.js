import React, { useState } from "react";
import { connect } from "react-redux";

import { useQuery, gql } from "@apollo/client";

import * as action from "../store/actions/index";
import Product from "../components/Product";
import { productFragment } from "../util/productFragment";
import "./Products.scss";

const Products = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(2);

  const limitHandler = (e) => {
    setLimit(+e.target.value);
  };

  const activePageHandler = (page) => {
    setActivePage(page);
  };

  const { loading, data, error } = useQuery(GET_PRODUCTS, {
    variables: { page: activePage, limit },
    onCompleted(data) {
      props.storeProducts(data.getProducts.products);
      props.storePaginationInfo(data.getProducts.paginationInfo);
    },
    onError(error) {
      // props.storeError(data.getProducts);
      console.log(error);
    },
  });

  return (
    <>
      {loading ? (
        <>
          <p style={{ textAlign: "center" }}>Loading..</p>
          {props.paginationInfo && (
            <div className="options-container">
              <div className="page">
                <>
                  {props.paginationInfo.prevPage && (
                    <button
                      className="btn-page"
                      onClick={() => activePageHandler(activePage - 1)}
                    >
                      Prev
                    </button>
                  )}
                  {Array.from({
                    length: props.paginationInfo.totalPages,
                  }).map((_, index) => (
                    <button
                      disabled={activePage === index + 1}
                      className="btn-page"
                      onClick={() => activePageHandler(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {props.paginationInfo.nextPage && (
                    <button
                      className="btn-page"
                      onClick={() => activePageHandler(activePage + 1)}
                    >
                      Next
                    </button>
                  )}
                </>
              </div>
              <div className="limit">
                <select value={limit} onChange={limitHandler}>
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          {props.products && props.products.length ? (
            <>
              {props.paginationInfo && (
                <div className="options-container">
                  <div className="page">
                    <>
                      {props.paginationInfo.prevPage && (
                        <button
                          className="btn-page"
                          onClick={() => activePageHandler(activePage - 1)}
                        >
                          Prev
                        </button>
                      )}
                      {Array.from({
                        length: props.paginationInfo.totalPages,
                      }).map((_, index) => (
                        <button
                          disabled={activePage === index + 1}
                          className="btn-page"
                          onClick={() => activePageHandler(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                      {props.paginationInfo.nextPage && (
                        <button
                          className="btn-page"
                          onClick={() => activePageHandler(activePage + 1)}
                        >
                          Next
                        </button>
                      )}
                    </>
                  </div>
                  <div className="limit">
                    <select value={limit} onChange={limitHandler}>
                      <option value="2">2</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="products-container">
                {props.products.map((product, index) => (
                  <Product key={index} product={product} />
                ))}
              </div>
            </>
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </>
  );
};
const GET_PRODUCTS = gql`
  query getProducts($page: Int!, $limit: Int!) {
    getProducts(page: $page, limit: $limit) {
      products {
        ...productInfo
      }
      paginationInfo {
        prevPage
        nextPage
        totalPages
      }
    }
  }
  ${productFragment}
`;

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    paginationInfo: state.productReducer.paginationInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeProducts: (products) => {
      dispatch(action.storeProducts(products));
    },
    storePaginationInfo: (paginationInfo) => {
      dispatch(action.storePaginationInfo(paginationInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
