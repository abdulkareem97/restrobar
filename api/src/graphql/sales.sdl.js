export const schema = gql`
  type Sale {
    id: Int!
    table: Table!
    bottles: JSON!
    total: JSON!
    status: String!
    extra: JSON
    tableId: Int!
  }

  type Query {
    sales: [Sale!]! @requireAuth
    sale(id: Int!): Sale @requireAuth
  }

  input CreateSaleInput {
    bottles: JSON!
    total: JSON!
    status: String!
    extra: JSON
    tableId: Int!
  }

  input UpdateSaleInput {
    bottles: JSON
    total: JSON
    status: String
    extra: JSON
    tableId: Int
  }

  type Mutation {
    createSale(input: CreateSaleInput!): Sale! @requireAuth
    updateSale(id: Int!, input: UpdateSaleInput!): Sale! @requireAuth
    deleteSale(id: Int!): Sale! @requireAuth
  }
`
