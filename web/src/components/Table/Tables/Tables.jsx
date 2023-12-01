import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Table/TablesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_TABLE_MUTATION = gql`
  mutation DeleteTableMutation($id: Int!) {
    deleteTable(id: $id) {
      id
    }
  }
`

const TablesList = ({ tables }) => {
  const [deleteTable] = useMutation(DELETE_TABLE_MUTATION, {
    onCompleted: () => {
      toast.success('Table deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete table ' + id + '?')) {
      deleteTable({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>Floor id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td>{truncate(table.id)}</td>
              <td>{truncate(table.name)}</td>
              <td>{timeTag(table.created_at)}</td>
              <td>{timeTag(table.updated_at)}</td>
              <td>{jsonTruncate(table.extra)}</td>
              <td>{truncate(table.floorId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.table({ id: table.id })}
                    title={'Show table ' + table.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTable({ id: table.id })}
                    title={'Edit table ' + table.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete table ' + table.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(table.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablesList
