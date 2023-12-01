export const schema = gql`
  type Table {
    id: Int!
    name: String!
    floor: Floor!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    floorId: Int!
  }

  type Query {
    tables: [Table!]! @requireAuth
    table(id: Int!): Table @requireAuth
  }

  input CreateTableInput {
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    floorId: Int!
  }

  input UpdateTableInput {
    name: String
    created_at: DateTime
    updated_at: DateTime
    extra: JSON
    floorId: Int
  }

  type Mutation {
    createTable(input: CreateTableInput!): Table! @requireAuth
    updateTable(id: Int!, input: UpdateTableInput!): Table! @requireAuth
    deleteTable(id: Int!): Table! @requireAuth
  }
`
