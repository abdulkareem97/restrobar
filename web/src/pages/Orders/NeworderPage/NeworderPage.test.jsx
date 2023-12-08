import { render } from '@redwoodjs/testing/web'

import NeworderPage from './NeworderPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NeworderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NeworderPage />)
    }).not.toThrow()
  })
})
