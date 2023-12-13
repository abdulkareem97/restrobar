import { Link, routes } from '@redwoodjs/router'

import Tables from 'src/components/Table/Tables'

export const QUERY = gql`
  query FindTables {
    tables {
      id
      name
      created_at
      updated_at
      extra
      floorId
      floor{
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tables yet. '}
      <Link to={routes.newTable()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ tables }) => {
  return <Tables tables={tables} />
}
