export const schema = gql`
  type Menu {
    id: Int!
    name: String!
    rate: Float!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    menus: [Menu!]! @requireAuth
    menu(id: Int!): Menu @requireAuth
  }

  input CreateMenuInput {
    name: String!
    rate: Float!
    extra: JSON
  }

  input UpdateMenuInput {
    name: String
    rate: Float
    extra: JSON
  }

  type Mutation {
    createMenu(input: CreateMenuInput!): Menu! @requireAuth
    updateMenu(id: Int!, input: UpdateMenuInput!): Menu! @requireAuth
    deleteMenu(id: Int!): Menu! @requireAuth
  }
`
