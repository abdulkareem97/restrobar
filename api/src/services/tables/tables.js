import { db } from 'src/lib/db'

export const tables = () => {
  return db.table.findMany()
}

export const table = ({ id }) => {
  return db.table.findUnique({
    where: { id },
  })
}

export const createTable = ({ input }) => {
  return db.table.create({
    data: input,
  })
}
export const neworder = ({ tableId }) => {
  return db.Sale.findMany({
    where: {
      tableId:tableId
    },
  })
}

export const updateTable = ({ id, input }) => {
  return db.table.update({
    data: input,
    where: { id },
  })
}

export const deleteTable = ({ id }) => {
  return db.table.delete({
    where: { id },
  })
}

export const Table = {
  floor: (_obj, { root }) => {
    return db.table.findUnique({ where: { id: root?.id } }).floor()
  },
  Sale: (_obj, { root }) => {
    return db.table.findUnique({ where: { id: root?.id } }).Sale()
  },
}
