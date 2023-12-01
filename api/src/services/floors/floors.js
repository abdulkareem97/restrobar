import { db } from 'src/lib/db'

export const floors = () => {
  return db.floor.findMany()
}

export const floor = ({ id }) => {
  return db.floor.findUnique({
    where: { id },
  })
}

export const createFloor = ({ input }) => {
  return db.floor.create({
    data: input,
  })
}

export const updateFloor = ({ id, input }) => {
  return db.floor.update({
    data: input,
    where: { id },
  })
}

export const deleteFloor = ({ id }) => {
  return db.floor.delete({
    where: { id },
  })
}

export const Floor = {
  Table: (_obj, { root }) => {
    return db.floor.findUnique({ where: { id: root?.id } }).Table()
  },
}
