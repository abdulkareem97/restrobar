import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay } from 'src/lib/formatters'

const DELETE_SALE_MUTATION = gql`
  mutation DeleteSaleMutation($id: Int!) {
    deleteSale(id: $id) {
      id
    }
  }
`

const Sale = ({ sale }) => {
  const [deleteSale] = useMutation(DELETE_SALE_MUTATION, {
    onCompleted: () => {
      toast.success('Sale deleted')
      navigate(routes.sales())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete sale ' + id + '?')) {
      deleteSale({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Sale {sale.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{sale.id}</td>
            </tr>
            <tr>
              <th>Bottles</th>
              <td>{jsonDisplay(sale.bottles)}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{jsonDisplay(sale.total)}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{sale.status}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(sale.extra)}</td>
            </tr>
            <tr>
              <th>Table id</th>
              <td>{sale.tableId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSale({ id: sale.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(sale.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Sale
