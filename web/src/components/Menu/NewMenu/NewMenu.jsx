import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MenuForm from 'src/components/Menu/MenuForm'

const CREATE_MENU_MUTATION = gql`
  mutation CreateMenuMutation($input: CreateMenuInput!) {
    createMenu(input: $input) {
      id
    }
  }
`

const NewMenu = () => {
  const [createMenu, { loading, error }] = useMutation(CREATE_MENU_MUTATION, {
    onCompleted: () => {
      toast.success('Menu created')
      navigate(routes.menus())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createMenu({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Menu</h2>
      </header>
      <div className="rw-segment-main">
        <MenuForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMenu
