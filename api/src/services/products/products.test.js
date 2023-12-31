import {
  products,
  product,
  createProduct,
  updateProduct,
  deleteProduct,
} from './products'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('products', () => {
  scenario('returns all products', async (scenario) => {
    const result = await products()

    expect(result.length).toEqual(Object.keys(scenario.product).length)
  })

  scenario('returns a single product', async (scenario) => {
    const result = await product({ id: scenario.product.one.id })

    expect(result).toEqual(scenario.product.one)
  })

  scenario('creates a product', async () => {
    const result = await createProduct({
      input: {
        name: 'String',
        rate: 142177.17800815823,
        btl_per_case: 9947303,
        updated_at: '2023-12-01T11:39:34.273Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.rate).toEqual(142177.17800815823)
    expect(result.btl_per_case).toEqual(9947303)
    expect(result.updated_at).toEqual(new Date('2023-12-01T11:39:34.273Z'))
  })

  scenario('updates a product', async (scenario) => {
    const original = await product({ id: scenario.product.one.id })
    const result = await updateProduct({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a product', async (scenario) => {
    const original = await deleteProduct({
      id: scenario.product.one.id,
    })
    const result = await product({ id: original.id })

    expect(result).toEqual(null)
  })
})
