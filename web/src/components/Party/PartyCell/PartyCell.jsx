import Party from 'src/components/Party/Party'

export const QUERY = gql`
  query FindPartyById($id: Int!) {
    party: party(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Party not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ party }) => {
  return <Party party={party} />
}
