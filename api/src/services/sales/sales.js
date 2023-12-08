import { db } from 'src/lib/db'

export const sales = () => {
  return db.sale.findMany()
}

export const sale = ({ id }) => {
  return db.sale.findUnique({
    where: { id },
  })
}

export const createSale = ({ input }) => {
  return db.sale.create({
    data: input,
  })
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
