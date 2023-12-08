import { Link, routes } from '@redwoodjs/router'

import Sales from 'src/components/Sale/Sales'

export const QUERY = gql`
  query FindSales {
    sales {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No sales yet. '}
      <Link to={routes.newSale()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ sales }) => {
  return <Sales sales={sales} />
}
