import { Link, routes } from '@redwoodjs/router'

import Floors from 'src/components/Floor/Floors'

export const QUERY = gql`
  query FindFloors {
    floors {
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
      {'No floors yet. '}
      <Link to={routes.newFloor()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ floors }) => {
  return <Floors floors={floors} />
}
