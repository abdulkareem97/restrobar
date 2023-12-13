import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Purchase/PurchasesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState,useEffect } from 'react'

const DELETE_PURCHASE_MUTATION = gql`
  mutation DeletePurchaseMutation($id: Int!) {
    deletePurchase(id: $id) {
      id
    }
  }
`

const PurchasesList = ({ purchases }) => {
  const [search_data, setSearch_data] = useState(purchases)
  const [rows_count, setRows_count] = useState(purchases.length <= 5 ? 5 : 10)

  useEffect(()=>{
    setSearch_data(purchases)

  },[purchases])
  console.log(purchases)
  const [deletePurchase] = useMutation(DELETE_PURCHASE_MUTATION, {
    onCompleted: () => {
      toast.success('Purchase deleted')
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
    if (confirm('Are you sure you want to delete purchase ' + id + '?')) {
      deletePurchase({ variables: { id } })
    }
  }
  const change = (search)=>{
    const search_val = search.target.value

    let filterData = purchases.filter((val) => {
      return (
        val.party.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 10)
    setSearch_data(filterData)
  }
  const columns = [
    {
      headerClassName: 'text-left',
     Header:  'SL. No',
      accessor: 'id',
           Cell: ({index}) => (
           index+1
       )
   },
    {
       headerClassName: 'text-left',
      Header:  'Party Name',
      accessor: 'party.name',

    },
    {
       headerClassName: 'text-left',
      Header:  'Date',
      // accessor: 'party.name',
      Cell: ({ original }) => (
        original.date.split('T00:00:00.000')[0]
      )

    },
    {
      headerClassName: 'text-left',
     Header:  'Total Amount',
     accessor: 'total.totalAmt',
    // Cell: ({ original }) => (
    //   original.total.totalAmt
    // )

   },

    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
        <Link
          to={routes.purchase({ id: original.id })}
          title={'Show purchase ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          Show
        </Link>

      </nav>
      ),
    },
  ]

  return (
    <>
                    <SearchTable
    change={change}
    placeholder={"Search By Typing Item Name"}
    columns={columns}
    rows_count={rows_count}
    search_data={search_data}
    />
    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Bottles</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Extra</th>
    //         <th>Party id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {purchases.map((purchase) => (
    //         <tr key={purchase.id}>
    //           <td>{truncate(purchase.id)}</td>
    //           <td>{jsonTruncate(purchase.bottles)}</td>
    //           <td>{timeTag(purchase.created_at)}</td>
    //           <td>{timeTag(purchase.updated_at)}</td>
    //           <td>{jsonTruncate(purchase.extra)}</td>
    //           <td>{truncate(purchase.partyId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.purchase({ id: purchase.id })}
    //                 title={'Show purchase ' + purchase.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editPurchase({ id: purchase.id })}
    //                 title={'Edit purchase ' + purchase.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete purchase ' + purchase.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(purchase.id)}
    //               >
    //                 Delete
    //               </button>
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default PurchasesList
