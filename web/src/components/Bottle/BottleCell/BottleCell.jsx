import Bottle from 'src/components/Bottle/Bottle'

export const QUERY = gql`
  query FindBottleById($id: Int!) {
    bottle: bottle(id: $id) {
      id
      quantity
      created_at
      updated_at
      extra
      productId
      product{
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Bottle not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bottle }) => {
  return <Bottle bottle={bottle} />
}
