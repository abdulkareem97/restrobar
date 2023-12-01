export const schema = gql`
  type Bottle {
    id: Int!
    product: Product!
    quantity: Int!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    productId: Int!
  }

  type Query {
    bottles: [Bottle!]! @requireAuth
    bottle(id: Int!): Bottle @requireAuth
  }

  input CreateBottleInput {
    quantity: Int!
    extra: JSON
    productId: Int!
  }

  input UpdateBottleInput {
    quantity: Int
    extra: JSON
    productId: Int
  }

  type Mutation {
    createBottle(input: CreateBottleInput!): Bottle! @requireAuth
    updateBottle(id: Int!, input: UpdateBottleInput!): Bottle! @requireAuth
    deleteBottle(id: Int!): Bottle! @requireAuth
  }
`
