import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TableForm from 'src/components/Table/TableForm'

export const QUERY = gql`
  query EditTableById($id: Int!) {
    table: table(id: $id) {
      id
      name
      created_at
      updated_at
      extra
      floorId
    }
  }
`
const UPDATE_TABLE_MUTATION = gql`
  mutation UpdateTableMutation($id: Int!, $input: UpdateTableInput!) {
    updateTable(id: $id, input: $input) {
      id
      name
      created_at
      updated_at
      extra
      floorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ table }) => {
  const [updateTable, { loading, error }] = useMutation(UPDATE_TABLE_MUTATION, {
    onCompleted: () => {
      toast.success('Table updated')
      navigate(routes.tables())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateTable({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Table {table?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TableForm
          table={table}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
