import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PurchaseForm from 'src/components/Purchase/PurchaseForm'

const CREATE_PURCHASE_MUTATION = gql`
  mutation CreatePurchaseMutation($input: CreatePurchaseInput!) {
    createPurchase(input: $input) {
      id
    }
  }
`

export const QUERY = gql`
  query FindNewPurchaseQuery {
    parties{
      id
      name
    }
    products{
      id
      name
      btl_per_case
      Bottle{
        id
        quantity
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ parties,products }) => {
  const [createPurchase, { loading, error }] = useMutation(
    CREATE_PURCHASE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Purchase created')
        navigate(routes.purchases())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createPurchase({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Purchase</h2>
      </header>
      <div className="rw-segment-main">
        <PurchaseForm onSave={onSave} loading={loading} error={error} parties={parties} products={products} />
      </div>
    </div>
  )
}
