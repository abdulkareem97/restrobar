export const standard = defineScenario({
  purchase: {
    one: {
      data: {
        invoiceNo: 'String',
        date: '2023-12-01T13:09:24.842Z',
        bottles: { foo: 'bar' },
        updated_at: '2023-12-01T13:09:24.842Z',
        total: { foo: 'bar' },
        party: {
          create: { name: 'String', updated_at: '2023-12-01T13:09:24.842Z' },
        },
      },
    },
    two: {
      data: {
        invoiceNo: 'String',
        date: '2023-12-01T13:09:24.842Z',
        bottles: { foo: 'bar' },
        updated_at: '2023-12-01T13:09:24.842Z',
        total: { foo: 'bar' },
        party: {
          create: { name: 'String', updated_at: '2023-12-01T13:09:24.842Z' },
        },
      },
    },
  },
})
