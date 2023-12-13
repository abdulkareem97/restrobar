import { db } from 'src/lib/db'

export const sales = () => {
  return db.sale.findMany()
}

export const sale = ({ id }) => {
  return db.sale.findUnique({
    where: { id },
  })
}

export const createSale = async ({ input, id }) => {
  let { orders, occupied, ...inp } = input
  let d;
  if (!id) {
    d = await db.sale.create({
      data: inp,
    })

  } else {
    let { tableId, ...input1 } = inp
    d = await db.sale.update({
      data: input1,
      where: { id },
    })
  }
  await db.table.update({
    data: {
      occupied
    },
    where: { id: inp.tableId }
  })
  if (!occupied) {
    orders.map(async (item) => {
      console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', item)

      await db.bottle.update({
        data: {
          quantity: {
            decrement: parseInt(item.quantity)
          },
        },
        where: { id: item.id },
      })

    }
    )
  }
  return d;
}

export const updateSale = ({ id, input }) => {
  return db.sale.update({
    data: input,
    where: { id },
  })
}

export const deleteSale = ({ id }) => {
  return db.sale.delete({
    where: { id },
  })
}

export const Sale = {
  table: (_obj, { root }) => {
    return db.sale.findUnique({ where: { id: root?.id } }).table()
  },
}
