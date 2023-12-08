import Purchase from 'src/components/Purchase/Purchase'

export const QUERY = gql`
  query FindPurchaseById($id: Int!) {
    purchase: purchase(id: $id) {
      id
      invoiceNo
      date
      total
      bottles
      created_at
      updated_at
      extra
      partyId
      party{
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Purchase not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ purchase }) => {
  return <Purchase purchase={purchase} />
}
