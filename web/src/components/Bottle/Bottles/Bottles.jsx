import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState,useEffect } from 'react'

import { QUERY } from 'src/components/Bottle/BottlesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_BOTTLE_MUTATION = gql`
  mutation DeleteBottleMutation($id: Int!) {
    deleteBottle(id: $id) {
      id
    }
  }
`

const BottlesList = ({ bottles }) => {

  const [search_data, setSearch_data] = useState(bottles)
  const [rows_count, setRows_count] = useState(bottles.length <= 5 ? 5 : 10)

  useEffect(()=>{
    setSearch_data(bottles)

  },[bottles])


  const [deleteBottle] = useMutation(DELETE_BOTTLE_MUTATION, {
    onCompleted: () => {
      toast.success('Bottle deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bottle ' + id + '?')) {
      deleteBottle({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = bottles.filter((val) => {
      return (
        val.product.name
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
      Header:  'Name',
      accessor: 'product.name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Quantity',
      accessor: 'quantity',
    },

    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
                        <nav className="rw-table-actions">
                   <Link
                     to={routes.bottle({ id: original.id })}
                     title={'Show bottle ' + original.id + ' detail'}
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

<>
            <SearchTable
    change={change}
    placeholder={"Search By Typing Product Name"}
    columns={columns}
    rows_count={rows_count}
    search_data={search_data}
    />
    </>


    </>
    //  <div className="rw-segment rw-table-wrapper-responsive">
    //    <table className="rw-table">
    //      <thead>
    //        <tr>
    //          <th>Id</th>
    //          <th>Quantity</th>
    //          <th>Created at</th>
    //          <th>Updated at</th>
    //          <th>Extra</th>
    //          <th>Product id</th>
    //          <th>&nbsp;</th>
    //        </tr>
    //      </thead>
    //      <tbody>
    //        {bottles.map((bottle) => (
    //          <tr key={bottle.id}>
    //            <td>{truncate(bottle.id)}</td>
    //            <td>{truncate(bottle.quantity)}</td>
    //            <td>{timeTag(bottle.created_at)}</td>
    //            <td>{timeTag(bottle.updated_at)}</td>
    //            <td>{jsonTruncate(bottle.extra)}</td>
    //            <td>{truncate(bottle.productId)}</td>
    //            <td>
    //              <nav className="rw-table-actions">
    //                <Link
    //                  to={routes.bottle({ id: bottle.id })}
    //                  title={'Show bottle ' + bottle.id + ' detail'}
    //                  className="rw-button rw-button-small"
    //                >
    //                  Show
    //                </Link>
    //                <Link
    //                  to={routes.editBottle({ id: bottle.id })}
    //                  title={'Edit bottle ' + bottle.id}
    //                  className="rw-button rw-button-small rw-button-blue"
    //                >
    //                  Edit
    //                </Link>
    //                <button
    //                  type="button"
    //                  title={'Delete bottle ' + bottle.id}
    //                  className="rw-button rw-button-small rw-button-red"
    //                  onClick={() => onDeleteClick(bottle.id)}
    //                >
    //                  Delete
    //                </button>
    //              </nav>
    //            </td>
    //          </tr>
    //        ))}
    //      </tbody>
    //    </table>
    //  </div>
  )
}

export default BottlesList
