import Menu from 'src/components/Menu/Menu'

export const QUERY = gql`
  query FindMenuById($id: Int!) {
    menu: menu(id: $id) {
      id
      name
      rate
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Menu not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ menu }) => {
  return <Menu menu={menu} />
}
