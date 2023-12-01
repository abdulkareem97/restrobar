import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BottleForm from 'src/components/Bottle/BottleForm'

const CREATE_BOTTLE_MUTATION = gql`
  mutation CreateBottleMutation($input: CreateBottleInput!) {
    createBottle(input: $input) {
      id
    }
  }
`

const NewBottle = () => {
  const [createBottle, { loading, error }] = useMutation(
    CREATE_BOTTLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Bottle created')
        navigate(routes.bottles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createBottle({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Bottle</h2>
      </header>
      <div className="rw-segment-main">
        <BottleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBottle
