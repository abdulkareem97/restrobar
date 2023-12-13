import { render } from '@redwoodjs/testing/web'

import NewOrdersForm from './NewOrdersForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewOrdersForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewOrdersForm />)
    }).not.toThrow()
  })
})
