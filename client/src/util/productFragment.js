import { gql } from "@apollo/client";

export const productFragment = gql`
  fragment productInfo on Product {
    _id
    name
    price
    image
    description
    creator
  }
`;
