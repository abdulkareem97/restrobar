import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FloorForm from 'src/components/Floor/FloorForm'

export const QUERY = gql`
  query EditFloorById($id: Int!) {
    floor: floor(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_FLOOR_MUTATION = gql`
  mutation UpdateFloorMutation($id: Int!, $input: UpdateFloorInput!) {
    updateFloor(id: $id, input: $input) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ floor }) => {
  const [updateFloor, { loading, error }] = useMutation(UPDATE_FLOOR_MUTATION, {
    onCompleted: () => {
      toast.success('Floor updated')
      navigate(routes.floors())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateFloor({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Floor {floor?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FloorForm
          floor={floor}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
