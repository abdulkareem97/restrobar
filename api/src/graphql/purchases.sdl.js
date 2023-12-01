export const schema = gql`
  type Purchase {
    id: Int!
    invoiceNo: String!
    date: DateTime!
    party: Party!
    bottles: JSON!
    created_at: DateTime!
    updated_at: DateTime!
    total: JSON!
    extra: JSON
    partyId: Int!
  }

  type Query {
    purchases: [Purchase!]! @requireAuth
    purchase(id: Int!): Purchase @requireAuth
  }

  input CreatePurchaseInput {
    invoiceNo: String!
    date: DateTime!
    bottles: JSON!
    total: JSON!
    extra: JSON
    partyId: Int!
    btls: JSON!
  }

  input UpdatePurchaseInput {
    invoiceNo: String
    date: DateTime
    bottles: JSON
    total: JSON
    extra: JSON
    partyId: Int
    btls: JSON
  }

  type Mutation {
    createPurchase(input: CreatePurchaseInput!): Purchase! @requireAuth
    updatePurchase(id: Int!, input: UpdatePurchaseInput!): Purchase!
      @requireAuth
    deletePurchase(id: Int!): Purchase! @requireAuth
  }
`
