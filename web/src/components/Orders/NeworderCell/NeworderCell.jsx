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

export const QUERY = gql`
  query FindNeworderQuery($id: Int!) {
    neworder: neworder(tableId: $id) {
      id
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

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ neworder,bottles }) => {
  return (
    <>


    </>
  )
}
