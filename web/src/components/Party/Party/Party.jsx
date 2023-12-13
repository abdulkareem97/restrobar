import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_PARTY_MUTATION = gql`
  mutation DeletePartyMutation($id: Int!) {
    deleteParty(id: $id) {
      id
    }
  }
`

const Party = ({ party }) => {
  const [deleteParty] = useMutation(DELETE_PARTY_MUTATION, {
    onCompleted: () => {
      toast.success('Party deleted')
      navigate(routes.parties())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete party ' + id + '?')) {
      deleteParty({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Party {party.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{party.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{party.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(party.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(party.updated_at)}</td>
            </tr>
            {/* <tr>
              <th>Extra</th>
              <td>{jsonDisplay(party.extra)}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editParty({ id: party.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(party.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Party
