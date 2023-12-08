export const schema = gql`
  type Floor {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    Table: [Table]!
  }

  type Query {
    floors: [Floor!]! @requireAuth
    floor(id: Int!): Floor @requireAuth
  }

  input CreateFloorInput {
    name: String!
    extra: JSON
  }

  input UpdateFloorInput {
    name: String
    extra: JSON
  }

  type Mutation {
    createFloor(input: CreateFloorInput!): Floor! @requireAuth
    updateFloor(id: Int!, input: UpdateFloorInput!): Floor! @requireAuth
    deleteFloor(id: Int!): Floor! @requireAuth
  }
`
