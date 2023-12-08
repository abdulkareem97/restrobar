import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_MENU_MUTATION = gql`
  mutation DeleteMenuMutation($id: Int!) {
    deleteMenu(id: $id) {
      id
    }
  }
`

const Menu = ({ menu }) => {
  const [deleteMenu] = useMutation(DELETE_MENU_MUTATION, {
    onCompleted: () => {
      toast.success('Menu deleted')
      navigate(routes.menus())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete menu ' + id + '?')) {
      deleteMenu({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Menu {menu.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{menu.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{menu.name}</td>
            </tr>
            <tr>
              <th>Rate</th>
              <td>{menu.rate}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(menu.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(menu.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(menu.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMenu({ id: menu.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(menu.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Menu
