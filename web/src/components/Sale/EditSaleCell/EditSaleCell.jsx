import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleForm from 'src/components/Sale/SaleForm'

export const QUERY = gql`
  query EditSaleById($id: Int!) {
    sale: sale(id: $id) {
      id
      bottles
      total
      status
      extra
      tableId
    }
  }
`
const UPDATE_SALE_MUTATION = gql`
  mutation UpdateSaleMutation($id: Int!, $input: UpdateSaleInput!) {
    updateSale(id: $id, input: $input) {
      id
      bottles
      total
      status
      extra
      tableId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ sale }) => {
  const [updateSale, { loading, error }] = useMutation(UPDATE_SALE_MUTATION, {
    onCompleted: () => {
      toast.success('Sale updated')
      navigate(routes.sales())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateSale({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Sale {sale?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SaleForm sale={sale} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
