import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BottleForm from 'src/components/Bottle/BottleForm'

export const QUERY = gql`
  query EditBottleById($id: Int!) {
    bottle: bottle(id: $id) {
      id
      quantity
      created_at
      updated_at
      extra
      productId
    }
  }
`
const UPDATE_BOTTLE_MUTATION = gql`
  mutation UpdateBottleMutation($id: Int!, $input: UpdateBottleInput!) {
    updateBottle(id: $id, input: $input) {
      id
      quantity
      created_at
      updated_at
      extra
      productId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bottle }) => {
  const [updateBottle, { loading, error }] = useMutation(
    UPDATE_BOTTLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Bottle updated')
        navigate(routes.bottles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateBottle({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Bottle {bottle?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BottleForm
          bottle={bottle}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
