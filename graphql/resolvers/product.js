const { AuthenticationError, UserInputError } = require("apollo-server");

const Product = require("../model/Product");

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

module.exports = {
  Query: {
    getProducts: async () => {
      return await Product.find();
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
          await Product.update(
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
          return { ...result._doc, id: result.id };
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
