import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import NewOrderCell from 'src/components/Orders/NeworderCell'
const NeworderPage = ({id}) => {
  return (
    <>
      <MetaTags title="Neworder" description="Neworder page" />

      {/* <h1>NeworderPage {id}</h1> */}
      <NewOrderCell id={id} />


    </>
  )
}

export default NeworderPage
