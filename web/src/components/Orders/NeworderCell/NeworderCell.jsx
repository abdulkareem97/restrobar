import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'
import { useEffect, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import Select from 'react-select'
import NewOrdersForm from '../NewOrdersForm/NewOrdersForm'

export const QUERY = gql`
  query FindNeworderQuery($id: Int!) {
    neworder: neworder(tableId: $id) {
      id
      tableId
      bottles
      total
      status
      extra
    }
    bottles{
      id
      quantity
      product{
        id
        name
        rate
      }
    }
    menus{
      id
      name
      rate
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ neworder,bottles,menus,id }) => {
  return (
    <>
    <div className="rw-segment h-[100vh]">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Sale</h2>
      </header>
      <div className="rw-segment-main">
        <NewOrdersForm neworder={neworder} bottles={bottles} menus={menus} id={id} />
      </div>
    </div>





    </>
  )
}
