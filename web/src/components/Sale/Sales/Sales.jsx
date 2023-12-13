import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Sale/SalesCell'
import { jsonTruncate, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState,useEffect } from 'react'


const DELETE_SALE_MUTATION = gql`
  mutation DeleteSaleMutation($id: Int!) {
    deleteSale(id: $id) {
      id
    }
  }
`

const SalesList = ({ sales }) => {

  const [search_data, setSearch_data] = useState(sales)
  const [rows_count, setRows_count] = useState(sales.length <= 5 ? 5 : 10)

  useEffect(()=>{
    setSearch_data(sales)

  },[sales])
  console.log(sales)


  const [deleteSale] = useMutation(DELETE_SALE_MUTATION, {
    onCompleted: () => {
      toast.success('Sale deleted')
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
    if (confirm('Are you sure you want to delete sale ' + id + '?')) {
      deleteSale({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = sales.filter((val) => {
      return (
        val.table.name
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
      Header:  'Table Name',
      accessor: 'table.name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Total',
      accessor: 'total.total',
    },
    {
       headerClassName: 'text-left',
      Header:  'Discount Name',
      accessor: 'total.disamt',
    },
    {
       headerClassName: 'text-left',
      Header:  'Grand Total',
      accessor: 'total.grand_total',
    },
    {
       headerClassName: 'text-left',
      Header:  'Status',
      accessor: 'status',
    },
    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
        <Link
          to={routes.sale({ id: original.id })}
          title={'Show sale ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          Show
        </Link>
        {/* <Link
          to={routes.editSale({ id: original.id })}
          title={'Edit sale ' + original.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          title={'Delete sale ' + original.id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(original.id)}
        >
          Delete
        </button> */}
      </nav>
      ),
    },
  ]

  return (
    <>
                <SearchTable
    change={change}
    placeholder={"Search By Typing Party Name"}
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
    //         <th>Total</th>
    //         <th>Status</th>
    //         <th>Extra</th>
    //         <th>Table id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {sales.map((sale) => (
    //         <tr key={sale.id}>
    //           <td>{truncate(sale.id)}</td>
    //           <td>{jsonTruncate(sale.bottles)}</td>
    //           <td>{jsonTruncate(sale.total)}</td>
    //           <td>{truncate(sale.status)}</td>
    //           <td>{jsonTruncate(sale.extra)}</td>
    //           <td>{truncate(sale.tableId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.sale({ id: sale.id })}
    //                 title={'Show sale ' + sale.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editSale({ id: sale.id })}
    //                 title={'Edit sale ' + sale.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete sale ' + sale.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(sale.id)}
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

export default SalesList
