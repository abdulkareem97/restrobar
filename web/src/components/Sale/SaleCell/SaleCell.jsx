import Sale from 'src/components/Sale/Sale'

export const QUERY = gql`
  query FindSaleById($id: Int!) {
    sale: sale(id: $id) {
      id
      bottles
      total
      status
      extra
      tableId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Sale not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ sale }) => {
  return <Sale sale={sale} />
}
