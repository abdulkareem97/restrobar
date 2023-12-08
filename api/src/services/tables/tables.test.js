import { tables, table, createTable, updateTable, deleteTable } from './tables'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tables', () => {
  scenario('returns all tables', async (scenario) => {
    const result = await tables()

    expect(result.length).toEqual(Object.keys(scenario.table).length)
  })

  scenario('returns a single table', async (scenario) => {
    const result = await table({ id: scenario.table.one.id })

    expect(result).toEqual(scenario.table.one)
  })

  scenario('creates a table', async (scenario) => {
    const result = await createTable({
      input: {
        name: 'String',
        occupied: true,
        updated_at: '2023-12-02T06:45:49.842Z',
        floorId: scenario.table.two.floorId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.occupied).toEqual(true)
    expect(result.updated_at).toEqual(new Date('2023-12-02T06:45:49.842Z'))
    expect(result.floorId).toEqual(scenario.table.two.floorId)
  })

  scenario('updates a table', async (scenario) => {
    const original = await table({ id: scenario.table.one.id })
    const result = await updateTable({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a table', async (scenario) => {
    const original = await deleteTable({ id: scenario.table.one.id })
    const result = await table({ id: original.id })

    expect(result).toEqual(null)
  })
})
