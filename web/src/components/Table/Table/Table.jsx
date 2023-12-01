import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_TABLE_MUTATION = gql`
  mutation DeleteTableMutation($id: Int!) {
    deleteTable(id: $id) {
      id
    }
  }
`

const Table = ({ table }) => {
  const [deleteTable] = useMutation(DELETE_TABLE_MUTATION, {
    onCompleted: () => {
      toast.success('Table deleted')
      navigate(routes.tables())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete table ' + id + '?')) {
      deleteTable({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Table {table.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{table.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{table.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(table.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(table.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(table.extra)}</td>
            </tr>
            <tr>
              <th>Floor id</th>
              <td>{table.floorId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTable({ id: table.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(table.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Table
