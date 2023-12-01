import {
  bottles,
  bottle,
  createBottle,
  updateBottle,
  deleteBottle,
} from './bottles'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bottles', () => {
  scenario('returns all bottles', async (scenario) => {
    const result = await bottles()

    expect(result.length).toEqual(Object.keys(scenario.bottle).length)
  })

  scenario('returns a single bottle', async (scenario) => {
    const result = await bottle({ id: scenario.bottle.one.id })

    expect(result).toEqual(scenario.bottle.one)
  })

  scenario('creates a bottle', async (scenario) => {
    const result = await createBottle({
      input: {
        quantity: 6497639,
        updated_at: '2023-12-01T13:40:28.497Z',
        productId: scenario.bottle.two.productId,
      },
    })

    expect(result.quantity).toEqual(6497639)
    expect(result.updated_at).toEqual(new Date('2023-12-01T13:40:28.497Z'))
    expect(result.productId).toEqual(scenario.bottle.two.productId)
  })

  scenario('updates a bottle', async (scenario) => {
    const original = await bottle({ id: scenario.bottle.one.id })
    const result = await updateBottle({
      id: original.id,
      input: { quantity: 8220363 },
    })

    expect(result.quantity).toEqual(8220363)
  })

  scenario('deletes a bottle', async (scenario) => {
    const original = await deleteBottle({
      id: scenario.bottle.one.id,
    })
    const result = await bottle({ id: original.id })

    expect(result).toEqual(null)
  })
})
