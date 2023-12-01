import { Link, routes } from '@redwoodjs/router'

import Parties from 'src/components/Party/Parties'

export const QUERY = gql`
  query FindParties {
    parties {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No parties yet. '}
      <Link to={routes.newParty()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ parties }) => {
  return <Parties parties={parties} />
}
