import { Link, routes } from '@redwoodjs/router'

import Menus from 'src/components/Menu/Menus'

export const QUERY = gql`
  query FindMenus {
    menus {
      id
      name
      rate
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
      {'No menus yet. '}
      <Link to={routes.newMenu()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ menus }) => {
  return <Menus menus={menus} />
}
