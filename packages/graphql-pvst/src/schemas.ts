import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Product {
    productName: String
  }

  type Query {
    product(slug: String!, locale: String!): Product
    allProducts(first: Int!, after: Int!, locale: String!): Product
  }
`;
