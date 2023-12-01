import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_PURCHASE_MUTATION = gql`
  mutation DeletePurchaseMutation($id: Int!) {
    deletePurchase(id: $id) {
      id
    }
  }
`

const Purchase = ({ purchase }) => {
  const [deletePurchase] = useMutation(DELETE_PURCHASE_MUTATION, {
    onCompleted: () => {
      toast.success('Purchase deleted')
      navigate(routes.purchases())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete purchase ' + id + '?')) {
      deletePurchase({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Purchase {purchase.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{purchase.id}</td>
            </tr>
            <tr>
              <th>Bottles</th>
              <td>{jsonDisplay(purchase.bottles)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(purchase.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(purchase.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(purchase.extra)}</td>
            </tr>
            <tr>
              <th>Party id</th>
              <td>{purchase.partyId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPurchase({ id: purchase.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(purchase.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Purchase
