export const schema = gql`
  type Product {
    id: Int!
    name: String!
    rate: Float!
    btl_per_case: Int!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    Bottle: [Bottle]!
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: Int!): Product @requireAuth
  }

  input CreateProductInput {
    name: String!
    rate: Float!
    btl_per_case: Int!
    extra: JSON
  }

  input UpdateProductInput {
    name: String
    rate: Float
    btl_per_case: Int
    extra: JSON
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`
