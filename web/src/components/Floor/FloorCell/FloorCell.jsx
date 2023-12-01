import Floor from 'src/components/Floor/Floor'

export const QUERY = gql`
  query FindFloorById($id: Int!) {
    floor: floor(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Floor not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ floor }) => {
  return <Floor floor={floor} />
}
