import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartyForm from 'src/components/Party/PartyForm'

export const QUERY = gql`
  query EditPartyById($id: Int!) {
    party: party(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_PARTY_MUTATION = gql`
  mutation UpdatePartyMutation($id: Int!, $input: UpdatePartyInput!) {
    updateParty(id: $id, input: $input) {
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

export const Success = ({ party }) => {
  const [updateParty, { loading, error }] = useMutation(UPDATE_PARTY_MUTATION, {
    onCompleted: () => {
      toast.success('Party updated')
      navigate(routes.parties())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateParty({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Party {party?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PartyForm
          party={party}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
