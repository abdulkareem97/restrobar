import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Bottle/BottlesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_BOTTLE_MUTATION = gql`
  mutation DeleteBottleMutation($id: Int!) {
    deleteBottle(id: $id) {
      id
    }
  }
`

const BottlesList = ({ bottles }) => {
  const [deleteBottle] = useMutation(DELETE_BOTTLE_MUTATION, {
    onCompleted: () => {
      toast.success('Bottle deleted')
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
    if (confirm('Are you sure you want to delete bottle ' + id + '?')) {
      deleteBottle({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Quantity</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>Product id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bottles.map((bottle) => (
            <tr key={bottle.id}>
              <td>{truncate(bottle.id)}</td>
              <td>{truncate(bottle.quantity)}</td>
              <td>{timeTag(bottle.created_at)}</td>
              <td>{timeTag(bottle.updated_at)}</td>
              <td>{jsonTruncate(bottle.extra)}</td>
              <td>{truncate(bottle.productId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.bottle({ id: bottle.id })}
                    title={'Show bottle ' + bottle.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBottle({ id: bottle.id })}
                    title={'Edit bottle ' + bottle.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete bottle ' + bottle.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bottle.id)}
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

export default BottlesList
