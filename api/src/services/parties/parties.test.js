import {
  parties,
  party,
  createParty,
  updateParty,
  deleteParty,
} from './parties'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('parties', () => {
  scenario('returns all parties', async (scenario) => {
    const result = await parties()

    expect(result.length).toEqual(Object.keys(scenario.party).length)
  })

  scenario('returns a single party', async (scenario) => {
    const result = await party({ id: scenario.party.one.id })

    expect(result).toEqual(scenario.party.one)
  })

  scenario('creates a party', async () => {
    const result = await createParty({
      input: { name: 'String', updated_at: '2023-12-01T11:48:36.703Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-12-01T11:48:36.703Z'))
  })

  scenario('updates a party', async (scenario) => {
    const original = await party({ id: scenario.party.one.id })
    const result = await updateParty({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a party', async (scenario) => {
    const original = await deleteParty({ id: scenario.party.one.id })
    const result = await party({ id: original.id })

    expect(result).toEqual(null)
  })
})
