import { gql } from "@apollo/client";

export const authFragment = gql`
  fragment authData on User {
    email
    token
    id
  }
`;
