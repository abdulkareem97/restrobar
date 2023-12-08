export const schema = gql`
  type Table {
    id: Int!
    name: String!
    occupied: Boolean!
    floor: Floor!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    floorId: Int!
    Sale: [Sale]!
  }

  type Query {
    tables: [Table!]! @requireAuth
    table(id: Int!): Table @requireAuth
    neworder(tableId: Int!): [Sale] @requireAuth
  }

  input CreateTableInput {
    name: String!
    occupied: Boolean!
    extra: JSON
    floorId: Int!
  }

  input UpdateTableInput {
    name: String
    occupied: Boolean
    extra: JSON
    floorId: Int
  }

  type Mutation {
    createTable(input: CreateTableInput!): Table! @requireAuth
    updateTable(id: Int!, input: UpdateTableInput!): Table! @requireAuth

    deleteTable(id: Int!): Table! @requireAuth
  }
`
