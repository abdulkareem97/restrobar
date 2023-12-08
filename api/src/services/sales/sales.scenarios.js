export const standard = defineScenario({
  sale: {
    one: {
      data: {
        bottles: { foo: 'bar' },
        total: { foo: 'bar' },
        status: 'String',
        table: {
          create: {
            name: 'String',
            occupied: true,
            updated_at: '2023-12-02T06:46:27.828Z',
            floor: {
              create: {
                name: 'String',
                updated_at: '2023-12-02T06:46:27.828Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        bottles: { foo: 'bar' },
        total: { foo: 'bar' },
        status: 'String',
        table: {
          create: {
            name: 'String',
            occupied: true,
            updated_at: '2023-12-02T06:46:27.828Z',
            floor: {
              create: {
                name: 'String',
                updated_at: '2023-12-02T06:46:27.828Z',
              },
            },
          },
        },
      },
    },
  },
})
