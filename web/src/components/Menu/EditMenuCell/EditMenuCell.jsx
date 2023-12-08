import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MenuForm from 'src/components/Menu/MenuForm'

export const QUERY = gql`
  query EditMenuById($id: Int!) {
    menu: menu(id: $id) {
      id
      name
      rate
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_MENU_MUTATION = gql`
  mutation UpdateMenuMutation($id: Int!, $input: UpdateMenuInput!) {
    updateMenu(id: $id, input: $input) {
      id
      name
      rate
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

export const Success = ({ menu }) => {
  const [updateMenu, { loading, error }] = useMutation(UPDATE_MENU_MUTATION, {
    onCompleted: () => {
      toast.success('Menu updated')
      navigate(routes.menus())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateMenu({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Menu {menu?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MenuForm menu={menu} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
