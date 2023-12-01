import Table from 'src/components/Table/Table'

export const QUERY = gql`
  query FindTableById($id: Int!) {
    table: table(id: $id) {
      id
      name
      created_at
      updated_at
      extra
      floorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Table not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ table }) => {
  return <Table table={table} />
}
