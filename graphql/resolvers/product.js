const products = [
  { id: "1", name: "prod1" },
  { id: "2", name: "prod2" },
];

const owners = [
  { id: "1", name: "owner1" },
  { id: "2", name: "owner2" },
];
module.exports = {
  Query: {
    getProducts: (parent, args, context) => {
      console.log(products);
      return products;
    },
    // addProduct: (_, args) => {},
  },
  Product: {
    owner: ({ id }) => {
      return owners.find((o) => o.id === id);
    },
  },
};
