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
        {/* <table className="rw-table">
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
        </table> */}

        <div className="p-2 w-full shadow-sm bg-white text-black ">
          <div className=" grid grid-cols-6 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-3 justify-center">Name</div>
            <div className="flex col-span-1 justify-center">Price</div>
            <div className="flex col-span-1 justify-center">Quantity</div>
            <div className="flex col-span-1 justify-center">Total</div>



          {
            sale.bottles.map((item)=>{
              return (
                <>
                <div className="flex col-span-3 justify-center">{item.name}</div>
                <div className="flex col-span-1 justify-center">{item.price}</div>
                <div className="flex col-span-1 justify-center">{item.quantity}</div>
                <div className="flex col-span-1 justify-center">{item.total}</div>
                </>
              )
            })
          }
          </div>




        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <div
            name="total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Total
          </div>
          <div className="flex">
            {sale.total.total}
          </div>

        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>


          <div
            name="discount"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount % :-
          </div>

          <div className='flex'>


            {sale.total.disc}
          </div>


          <div
            name="discountamt"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount Amount :-
          </div>

          <div className='flex'>


            {
              sale.total.disamt
            }
          </div>
        </div>
        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <div
            name="grand_total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Grand total
          </div>
          <div className="flex">
            {sale.total.grand_total}
          </div>

        </div>
      </div>

      </div>
      <nav className="rw-button-group">
        {/* <Link
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
        </button> */}
      </nav>
    </>
  )
}

export default Sale
