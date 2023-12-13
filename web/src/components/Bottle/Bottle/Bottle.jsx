import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_BOTTLE_MUTATION = gql`
  mutation DeleteBottleMutation($id: Int!) {
    deleteBottle(id: $id) {
      id
    }
  }
`

const Bottle = ({ bottle }) => {
  const [deleteBottle] = useMutation(DELETE_BOTTLE_MUTATION, {
    onCompleted: () => {
      toast.success('Bottle deleted')
      navigate(routes.bottles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bottle ' + id + '?')) {
      deleteBottle({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Bottle {bottle.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bottle.id}</td>
            </tr>
            <tr>
              <th>Product Name</th>
              <td>{bottle.product.name}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{bottle.quantity}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(bottle.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(bottle.updated_at)}</td>
            </tr>
            {/* <tr>
              <th>Extra</th>
              <td>{jsonDisplay(bottle.extra)}</td>
            </tr> */}

          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {/* <Link
          to={routes.editBottle({ id: bottle.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bottle.id)}
        >
          Delete
        </button> */}
      </nav>
    </>
  )
}

export default Bottle
