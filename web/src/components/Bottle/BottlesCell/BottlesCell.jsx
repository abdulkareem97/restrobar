import { Link, routes } from '@redwoodjs/router'

import Bottles from 'src/components/Bottle/Bottles'

export const QUERY = gql`
  query FindBottles {
    bottles {
      id
      quantity
      created_at
      updated_at
      extra
      productId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bottles yet. '}
      <Link to={routes.newBottle()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bottles }) => {
  return <Bottles bottles={bottles} />
}
