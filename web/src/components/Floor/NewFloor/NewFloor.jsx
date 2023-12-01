import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FloorForm from 'src/components/Floor/FloorForm'

const CREATE_FLOOR_MUTATION = gql`
  mutation CreateFloorMutation($input: CreateFloorInput!) {
    createFloor(input: $input) {
      id
    }
  }
`

const NewFloor = () => {
  const [createFloor, { loading, error }] = useMutation(CREATE_FLOOR_MUTATION, {
    onCompleted: () => {
      toast.success('Floor created')
      navigate(routes.floors())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createFloor({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Floor</h2>
      </header>
      <div className="rw-segment-main">
        <FloorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFloor
