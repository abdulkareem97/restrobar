import { render } from '@redwoodjs/testing/web'

import SearchTable from './SearchTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchTable />)
    }).not.toThrow()
  })
})
