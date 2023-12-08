import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleForm from 'src/components/Sale/SaleForm'

const CREATE_SALE_MUTATION = gql`
  mutation CreateSaleMutation($input: CreateSaleInput!) {
    createSale(input: $input) {
      id
    }
  }
`

const NewSale = () => {
  const [createSale, { loading, error }] = useMutation(CREATE_SALE_MUTATION, {
    onCompleted: () => {
      toast.success('Sale created')
      navigate(routes.sales())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createSale({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Sale</h2>
      </header>
      <div className="rw-segment-main">
        <SaleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSale
