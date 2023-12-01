import {
  purchases,
  purchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from './purchases'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('purchases', () => {
  scenario('returns all purchases', async (scenario) => {
    const result = await purchases()

    expect(result.length).toEqual(Object.keys(scenario.purchase).length)
  })

  scenario('returns a single purchase', async (scenario) => {
    const result = await purchase({ id: scenario.purchase.one.id })

    expect(result).toEqual(scenario.purchase.one)
  })

  scenario('creates a purchase', async (scenario) => {
    const result = await createPurchase({
      input: {
        invoiceNo: 'String',
        date: '2023-12-01T13:09:24.712Z',
        bottles: { foo: 'bar' },
        updated_at: '2023-12-01T13:09:24.712Z',
        total: { foo: 'bar' },
        partyId: scenario.purchase.two.partyId,
      },
    })

    expect(result.invoiceNo).toEqual('String')
    expect(result.date).toEqual(new Date('2023-12-01T13:09:24.712Z'))
    expect(result.bottles).toEqual({ foo: 'bar' })
    expect(result.updated_at).toEqual(new Date('2023-12-01T13:09:24.712Z'))
    expect(result.total).toEqual({ foo: 'bar' })
    expect(result.partyId).toEqual(scenario.purchase.two.partyId)
  })

  scenario('updates a purchase', async (scenario) => {
    const original = await purchase({
      id: scenario.purchase.one.id,
    })
    const result = await updatePurchase({
      id: original.id,
      input: { invoiceNo: 'String2' },
    })

    expect(result.invoiceNo).toEqual('String2')
  })

  scenario('deletes a purchase', async (scenario) => {
    const original = await deletePurchase({
      id: scenario.purchase.one.id,
    })
    const result = await purchase({ id: original.id })

    expect(result).toEqual(null)
  })
})
