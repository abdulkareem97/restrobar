import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_FLOOR_MUTATION = gql`
  mutation DeleteFloorMutation($id: Int!) {
    deleteFloor(id: $id) {
      id
    }
  }
`

const Floor = ({ floor }) => {
  const [deleteFloor] = useMutation(DELETE_FLOOR_MUTATION, {
    onCompleted: () => {
      toast.success('Floor deleted')
      navigate(routes.floors())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete floor ' + id + '?')) {
      deleteFloor({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Floor {floor.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{floor.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{floor.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(floor.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(floor.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(floor.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFloor({ id: floor.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(floor.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Floor
