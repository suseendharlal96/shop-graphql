import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { useLazyQuery, gql } from "@apollo/client";

import * as action from "../store/actions/index";
import Product from "../components/Product";
import ProductCreation from "../components/ProductCreation";
import { productFragment } from "../util/productFragment";
import "./Products.scss";

const Products = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [operationType, setOperationType] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const history = useHistory();
  useEffect(() => {
    history.push("/");
    fetchProducts();
  }, []);

  const limitHandler = (e) => {
    setLimit(+e.target.value);
  };

  const activePageHandler = (page) => {
    setActivePage(page);
  };

  const setModalContent = (data) => {
    setModalOpen(true);
    setId(data.id);
    setOperationType(data.type);
    if (data.type === "edit") {
      const products = [...props.products];
      setEditProduct(products.find((p) => p._id === data.id));
    }
  };

  const closeModal = () => {
    history.push("/");
    setModalOpen(false);
    setId(null);
    setOperationType(null);
  };

  const operationDone = () => {
    fetchProducts();
    closeModal();
  };

  const addProduct = () => {
    history.push("/add-product");
    setOperationType("add");
    setModalOpen(true);
  };

  const [fetchProducts, { loading }] = useLazyQuery(GET_PRODUCTS, {
    variables: { page: activePage, limit },
    onCompleted(data) {
      props.storeProducts(data.getProducts.products);
      props.storePaginationInfo(data.getProducts.paginationInfo);
    },
    onError(error) {
      // props.storeError(data.getProducts);
      console.log(error);
    },
    fetchPolicy: "cache-and-network",
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
                      key={index}
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
                          key={index}
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
                  {props.token && (
                    <div className="create-new">
                      <button
                        className="new-prod"
                        data-tooltip="Add new product"
                        onClick={addProduct}
                      >
                        +
                      </button>
                    </div>
                  )}
                  <div className="limit">
                    <select value={limit} onChange={limitHandler}>
                      <option value="2">2</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
              )}
              <>
                <div className="products-container">
                  {props.products.map((product, index) => (
                    <Product
                      key={index}
                      product={product}
                      setModalContent={(data) => setModalContent(data)}
                    />
                  ))}
                </div>
                {isModalOpen && (
                  <ProductCreation
                    id={id}
                    operationType={operationType}
                    editProduct={editProduct}
                    operationDone={operationDone}
                    closeModal={closeModal}
                  />
                )}
              </>
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
    token: state.authReducer.token,
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
