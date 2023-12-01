import Product from 'src/components/Product/Product'

export const QUERY = gql`
  query FindProductById($id: Int!) {
    product: product(id: $id) {
      id
      name
      rate
      btl_per_case
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Product not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ product }) => {
  return <Product product={product} />
}
