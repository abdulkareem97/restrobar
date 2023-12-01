export const schema = gql`
  type Party {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    Purchase: [Purchase]!
  }

  type Query {
    parties: [Party!]! @requireAuth
    party(id: Int!): Party @requireAuth
  }

  input CreatePartyInput {
    name: String!
    extra: JSON
  }

  input UpdatePartyInput {
    name: String
    extra: JSON
  }

  type Mutation {
    createParty(input: CreatePartyInput!): Party! @requireAuth
    updateParty(id: Int!, input: UpdatePartyInput!): Party! @requireAuth
    deleteParty(id: Int!): Party! @requireAuth
  }
`
