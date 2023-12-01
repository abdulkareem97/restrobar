import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PurchaseForm from 'src/components/Purchase/PurchaseForm'

export const QUERY = gql`
  query EditPurchaseById($id: Int!) {
    purchase: purchase(id: $id) {
      id
      bottles
      created_at
      updated_at
      extra
      partyId
    }
  }
`
const UPDATE_PURCHASE_MUTATION = gql`
  mutation UpdatePurchaseMutation($id: Int!, $input: UpdatePurchaseInput!) {
    updatePurchase(id: $id, input: $input) {
      id
      bottles
      created_at
      updated_at
      extra
      partyId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ purchase }) => {
  const [updatePurchase, { loading, error }] = useMutation(
    UPDATE_PURCHASE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Purchase updated')
        navigate(routes.purchases())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updatePurchase({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Purchase {purchase?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PurchaseForm
          purchase={purchase}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
