import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Party/PartiesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_PARTY_MUTATION = gql`
  mutation DeletePartyMutation($id: Int!) {
    deleteParty(id: $id) {
      id
    }
  }
`

const PartiesList = ({ parties }) => {
  const [deleteParty] = useMutation(DELETE_PARTY_MUTATION, {
    onCompleted: () => {
      toast.success('Party deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete party ' + id + '?')) {
      deleteParty({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party) => (
            <tr key={party.id}>
              <td>{truncate(party.id)}</td>
              <td>{truncate(party.name)}</td>
              <td>{timeTag(party.created_at)}</td>
              <td>{timeTag(party.updated_at)}</td>
              <td>{jsonTruncate(party.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.party({ id: party.id })}
                    title={'Show party ' + party.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editParty({ id: party.id })}
                    title={'Edit party ' + party.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete party ' + party.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(party.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PartiesList
