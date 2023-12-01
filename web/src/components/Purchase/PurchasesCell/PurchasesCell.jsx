import { Link, routes } from '@redwoodjs/router'

import Purchases from 'src/components/Purchase/Purchases'

export const QUERY = gql`
  query FindPurchases {
    purchases {
      id
      bottles
      created_at
      updated_at
      extra
      partyId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No purchases yet. '}
      <Link to={routes.newPurchase()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ purchases }) => {
  return <Purchases purchases={purchases} />
}
