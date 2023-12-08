import { MdTableRestaurant } from "react-icons/md";
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query OrdersQuery {
    floors {
      id
      name
      Table{
        id
        name
        occupied
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ floors }) => {

  const newOrderPage = (id) => {
    navigate(routes.neworder({id}))
  }
  return (
    <>

      <div className='bg-white pb-9'>


        <div className="text-3xl flex justify-center p-7  text-white">
          <h1 className=" bg-slate-800 p-3 rounded-3xl ">Resturant - Table Map</h1>
        </div>

        <div className='text-black'>
          {
            floors.map((floor) => {
              return (
                <>
                  <div className='border border-black rounded-xl mx-11 my-3 p-4 text-xl'>
                    <div className=' flex justify-center p-2'>
                      <h1 className='underline'>{floor.name}</h1>
                    </div>
                    <div className='grid grid-cols-4 justify-items-center'>
                      {
                        floor.Table.map((item) => {
                          return (
                            <div className={`flex flex-col items-center hover:cursor-pointer  ${item.occupied ? 'text-red-700' : 'text-green-700'}`} onClick={()=>newOrderPage(item.id)}>
                              <span>{item.name}</span>
                              <MdTableRestaurant className={`text-xl`} />
                              <span className=''>{item.occupied ? 'In Progress' : 'Empty'}</span>
                            </div>
                          )
                        })
                      }
                      {/* {
                        beds.filter((bed)=>bed.floorId==floor.id).map((item)=>{
                          return(
                            <div className={`flex flex-col items-center  ${item.ipd?.patient.name ? 'text-red-700' : 'text-green-700'}`}>
                              <span>{item.bed_name}</span>
                              <FaBed className={`text-xl`} />
                              <span className=''>{item.ipd?.patient.name || 'Empty'}</span>
                            </div>
                          )
                        })
                      } */}

                    </div>
                  </div>
                </>

              )
            })
          }
        </div>

      </div>


    </>
  )
}
