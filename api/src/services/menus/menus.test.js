import { menus, menu, createMenu, updateMenu, deleteMenu } from './menus'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('menus', () => {
  scenario('returns all menus', async (scenario) => {
    const result = await menus()

    expect(result.length).toEqual(Object.keys(scenario.menu).length)
  })

  scenario('returns a single menu', async (scenario) => {
    const result = await menu({ id: scenario.menu.one.id })

    expect(result).toEqual(scenario.menu.one)
  })

  scenario('creates a menu', async () => {
    const result = await createMenu({
      input: {
        name: 'String',
        rate: 1992208.7375016485,
        updated_at: '2023-12-08T13:18:57.895Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.rate).toEqual(1992208.7375016485)
    expect(result.updated_at).toEqual(new Date('2023-12-08T13:18:57.895Z'))
  })

  scenario('updates a menu', async (scenario) => {
    const original = await menu({ id: scenario.menu.one.id })
    const result = await updateMenu({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a menu', async (scenario) => {
    const original = await deleteMenu({ id: scenario.menu.one.id })
    const result = await menu({ id: original.id })

    expect(result).toEqual(null)
  })
})
