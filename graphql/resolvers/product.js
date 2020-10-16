const { AuthenticationError, UserInputError } = require("apollo-server");

const Product = require("../model/Product");
const Cart = require("../model/Cart");

const validateProduct = (name, price, image, description) => {
  if (name === "") {
    throw new UserInputError("Required", { name: "Required" });
  }
  if (price === "") {
    throw new UserInputError("Required", { price: "Required" });
  }
  if (image === "") {
    throw new UserInputError("Required", { image: "Required" });
  }
  if (description === "") {
    throw new UserInputError("Required", { description: "Required" });
  }
};

let paginationInfo;

module.exports = {
  Query: {
    getProducts: async (_, { page, limit }) => {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let allProducts = await Product.find();
      let products;
      if (startIndex < allProducts.length) {
        products = await Product.find().limit(limit).skip(startIndex);
      } else {
        products = [...allProducts];
      }
      const paginationInfo = {};
      paginationInfo.totalPages = Math.ceil(allProducts.length / limit);
      if (endIndex < allProducts.length) {
        paginationInfo.nextPage = page + 1;
      }
      if (startIndex !== 0) {
        paginationInfo.prevPage = page - 1;
      }
      console.log(paginationInfo);
      return { products, paginationInfo };
    },
  },
  Mutation: {
    addProduct: async (
      _,
      { name, price, image, description },
      { loggedUser }
    ) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      validateProduct(name, price, image, description);
      const product = await Product.create({
        name,
        price,
        image,
        description,
        creator: loggedUser.id,
      });
      return product;
    },
    updateProduct: async (
      _,
      { id, name, price, image, description },
      { loggedUser }
    ) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      validateProduct(name, price, image, description);
      const product = await Product.findById(id);
      if (product) {
        if (product.creator == loggedUser.id) {
          await Product.updateOne(
            { _id: id },
            {
              $set: {
                name,
                price,
                image,
                description,
              },
            }
          );
          const result = await Product.findById(id);
          return result;
        } else {
          throw new AuthenticationError("Unauthorized", {
            error: "Unauthorized to perform action",
          });
        }
      } else {
        throw new UserInputError("product not found", {
          error: "product not found",
        });
      }
    },
    deleteProduct: async (_, { id }, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("unauthenticated", {
          error: "unauth",
        });
      }
      const product = await Product.findById(id);
      if (product) {
        if (product.creator == loggedUser.id) {
          await Product.deleteOne({ _id: id });
          return "Deleted successfully";
        } else {
          throw new AuthenticationError("Unauthorized", {
            error: "Unauthorized to perform action",
          });
        }
      } else {
        throw new UserInputError("product not found", {
          error: "product not found",
        });
      }
    },
  },
};
