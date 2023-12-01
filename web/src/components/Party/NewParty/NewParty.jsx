import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartyForm from 'src/components/Party/PartyForm'

const CREATE_PARTY_MUTATION = gql`
  mutation CreatePartyMutation($input: CreatePartyInput!) {
    createParty(input: $input) {
      id
    }
  }
`

const NewParty = () => {
  const [createParty, { loading, error }] = useMutation(CREATE_PARTY_MUTATION, {
    onCompleted: () => {
      toast.success('Party created')
      navigate(routes.parties())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createParty({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Party</h2>
      </header>
      <div className="rw-segment-main">
        <PartyForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewParty
