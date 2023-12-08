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
      <div className="bg-white p-6 shadow-lg rounded-lg grid gap-4 grid-cols-2 text-sm">

        <div className="col-span-2">
          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <th className="p-4">Id</th>
                {/* <th className="p-4">Invoice no</th> */}
                <th className="p-4">Party Name</th>
                <th className="p-4">Date</th>
              </tr>
              <tr>
                <td className="p-4">{purchase.id}</td>
                {/* <td className="p-4">{purchase.invoiceNo}</td> */}
                <td className="p-4">{purchase.party.name}</td>
                <td className="p-4">{purchase.date.split('T00:00:00.000Z')}</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="col-span-2">
          <h3 className=" font-bold mb-4">Product Information</h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr>
                <th className="p-4">Sl No.</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Rate for CB</th>
                <th className="p-4">CB's</th>
                <th className="p-4">Btls</th>
                <th className="p-4">Amount(Rs.)</th>

              </tr>
            </thead>
            <tbody>
              {purchase.bottles.map((item, index) => (
                <tr key={index}>

                  <td className="p-4 text-center">{index+1}</td>
                  <td className="p-4 text-center">{item.product_name}</td>
                  <td className="p-4 text-center">{item.rate_for_cb}</td>
                  <td className="p-4 text-center">{item.cb}</td>
                  <td className="p-4 text-center">{item.btls}</td>
                  <td className="p-4 text-center">{item.amount}</td>
                  {/* <td className="p-4">{item.mfr.name}</td> */}
                  {/* <td className="p-4">{item.product.name}</td>
                  <td className="p-4">{item.batch}</td>
                  <td className="p-4">{item.paid_qty}</td>
                  <td className="p-4">{item.free_qty}</td>
                  <td className="p-4">{item.pack}</td>
                  <td className="p-4">{item.exp ? item.exp.split('-')[1] + '-' + item.exp.split('-')[0] : '04-2026'} </td>
                  <td className="p-4">{item.mrp.toFixed(2)}</td>
                  <td className="p-4">{item.rate.toFixed(2)}</td>
                  <td className="p-4">{item.dis.toFixed(2)}</td>
                  <td className="p-4">{item.sgst}</td>
                  <td className="p-4">{item.cgst}</td>
                  <td className="p-4">{item.amount.toFixed(2)}</td>
                  <td className="p-4">{isNaN(parseFloat(item.net_amount).toFixed(2)) ? (0).toFixed(2) : parseFloat(item.net_amount).toFixed(2)}</td> */}
                </tr>
              ))}


            </tbody>
          </table>
        </div>

        <div className="col-span-2">

          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <td className="p-4 font-bold">Total</td>
                {/* <td className="p-4 font-bold">Discount</td>
                <td className="p-4 font-bold">Sgst</td>
                <td className="p-4 font-bold">Cgst</td>
                <td className="p-4 font-bold">Grand total</td> */}
                <td className="p-4 font-bold">Created at</td>
              </tr>

              <tr className=''>
                <td className="p-4">{purchase.total.totalAmt}</td>
                <td className="p-4">{purchase.created_at.split('T')[0]}</td>
                {/* <td className="p-4">{purchaseMedicine.discount.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.sgst.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.cgst.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.grand_total.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.created_at.split('T')[0]}</td> */}
              </tr>
              {/* {    date = new Date().toLocaleDateString() } */}

            </tbody>
          </table>
        </div>
      </div>

      <nav className="rw-button-group">
        {/* <Link
        to={routes.editPurchaseMedicine({ id: purchaseMedicine.id })}
        className="rw-button rw-button-blue"
      >
        Edit
      </Link> */}
        {
        // hasRole('admin') &&
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(purchaseMedicine.id)}
        >
          Delete
        </button>}
      </nav>
    </>
  )
}

export default Purchase
