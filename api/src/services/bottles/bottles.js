import { db } from 'src/lib/db'

export const bottles = () => {
  return db.bottle.findMany()
}

export const bottle = ({ id }) => {
  return db.bottle.findUnique({
    where: { id },
  })
}

export const createBottle = ({ input }) => {
  return db.bottle.create({
    data: input,
  })
}

export const updateBottle = ({ id, input }) => {
  return db.bottle.update({
    data: input,
    where: { id },
  })
}

export const deleteBottle = ({ id }) => {
  return db.bottle.delete({
    where: { id },
  })
}

export const Bottle = {
  product: (_obj, { root }) => {
    return db.bottle.findUnique({ where: { id: root?.id } }).product()
  },
}
