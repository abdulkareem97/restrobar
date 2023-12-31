import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Floor/FloorsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState,useEffect } from 'react'

const DELETE_FLOOR_MUTATION = gql`
  mutation DeleteFloorMutation($id: Int!) {
    deleteFloor(id: $id) {
      id
    }
  }
`

const FloorsList = ({ floors }) => {
  const [search_data, setSearch_data] = useState(floors)
  const [rows_count, setRows_count] = useState(floors.length <= 5 ? 5 : 10)

  useEffect(()=>{
    setSearch_data(floors)

  },[floors])
  const [deleteFloor] = useMutation(DELETE_FLOOR_MUTATION, {
    onCompleted: () => {
      toast.success('Floor deleted')
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
    if (confirm('Are you sure you want to delete floor ' + id + '?')) {
      deleteFloor({ variables: { id } })
    }
  }
  const change = (search)=>{
    const search_val = search.target.value

    let filterData = floors.filter((val) => {
      return (
        val.name
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
      accessor: 'name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
        <Link
          to={routes.floor({ id: original.id })}
          title={'Show floor ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          Show
        </Link>
        <Link
          to={routes.editFloor({ id: original.id })}
          title={'Edit floor ' + original.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        {/* <button
          type="button"
          title={'Delete floor ' + floor.id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(floor.id)}
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
    placeholder={"Search By Typing Floor Name"}
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
    //         <th>Name</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Extra</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {floors.map((floor) => (
    //         <tr key={floor.id}>
    //           <td>{truncate(floor.id)}</td>
    //           <td>{truncate(floor.name)}</td>
    //           <td>{timeTag(floor.created_at)}</td>
    //           <td>{timeTag(floor.updated_at)}</td>
    //           <td>{jsonTruncate(floor.extra)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.floor({ id: floor.id })}
    //                 title={'Show floor ' + floor.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editFloor({ id: floor.id })}
    //                 title={'Edit floor ' + floor.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete floor ' + floor.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(floor.id)}
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

export default FloorsList
