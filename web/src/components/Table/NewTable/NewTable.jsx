import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TableForm from 'src/components/Table/TableForm'

const CREATE_TABLE_MUTATION = gql`
  mutation CreateTableMutation($input: CreateTableInput!) {
    createTable(input: $input) {
      id
    }
  }
`

const NewTable = () => {
  const [createTable, { loading, error }] = useMutation(CREATE_TABLE_MUTATION, {
    onCompleted: () => {
      toast.success('Table created')
      navigate(routes.tables())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createTable({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Table</h2>
      </header>
      <div className="rw-segment-main">
        <TableForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTable
