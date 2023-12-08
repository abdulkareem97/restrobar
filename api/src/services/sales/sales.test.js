import { sales, sale, createSale, updateSale, deleteSale } from './sales'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sales', () => {
  scenario('returns all sales', async (scenario) => {
    const result = await sales()

    expect(result.length).toEqual(Object.keys(scenario.sale).length)
  })

  scenario('returns a single sale', async (scenario) => {
    const result = await sale({ id: scenario.sale.one.id })

    expect(result).toEqual(scenario.sale.one)
  })

  scenario('creates a sale', async (scenario) => {
    const result = await createSale({
      input: {
        bottles: { foo: 'bar' },
        total: { foo: 'bar' },
        status: 'String',
        tableId: scenario.sale.two.tableId,
      },
    })

    expect(result.bottles).toEqual({ foo: 'bar' })
    expect(result.total).toEqual({ foo: 'bar' })
    expect(result.status).toEqual('String')
    expect(result.tableId).toEqual(scenario.sale.two.tableId)
  })

  scenario('updates a sale', async (scenario) => {
    const original = await sale({ id: scenario.sale.one.id })
    const result = await updateSale({
      id: original.id,
      input: { bottles: { foo: 'baz' } },
    })

    expect(result.bottles).toEqual({ foo: 'baz' })
  })

  scenario('deletes a sale', async (scenario) => {
    const original = await deleteSale({ id: scenario.sale.one.id })
    const result = await sale({ id: original.id })

    expect(result).toEqual(null)
  })
})
