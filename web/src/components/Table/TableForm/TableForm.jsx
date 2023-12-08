import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { convertObjectValuesToUpper } from 'src/Utils/Utils'

const TableForm = (props) => {
  const [floors, setFloors] = useState([])
  const [defaultFloor, setDefaultFloor] = useState()
  const [floorId, setFloorId] = useState()

  useEffect(() => {
    const arrFloor = props.floors.map((item) => {
      const obj = { 'label': item.name, 'value': item.id }
      return obj
    })
    // // console.log(arrPat)
    setFloors(arrFloor)
  }, [])

  const onSubmit = (data) => {
    data['floorId'] = floorId
    data['occupied'] = false
    data = convertObjectValuesToUpper(data)
    props.onSave(data, props?.table?.id)
  }
  const changeFloorId = (item) => {
    // // console.log(item)
    setDefaultFloor(item)
    setFloorId(item.value)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

<div className='flex items-center mt-3  gap-x-4'>
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <div className="flex-1">

        <TextField
          name="name"
          defaultValue={props.table?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        </div>

        <FieldError name="name" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            name="floorId"
            className="rw-label mt-0"
            errorClassName="rw-label mt-0 rw-label-error"
          >
            Floor
          </Label>

          {/* <NumberField
          name="floorId"
          defaultValue={props.bed?.floorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}
          <div className=" flex-1">
            <Select options={floors} onChange={changeFloorId} isClearable={true}
              value={defaultFloor}

            />
          </div>

          <FieldError name="floorId" className="rw-field-error" />
        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TableForm
