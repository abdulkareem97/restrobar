import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import OrderCell from 'src/components/Orders/OrdersCell'
const OrdersPage = () => {
  return (
    <>
      <MetaTags title="Orders" description="Orders page" />

      <OrderCell />
    </>
  )
}

export default OrdersPage
