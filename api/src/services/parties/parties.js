import { db } from 'src/lib/db'

export const parties = () => {
  return db.party.findMany()
}

export const party = ({ id }) => {
  return db.party.findUnique({
    where: { id },
  })
}

export const createParty = ({ input }) => {
  return db.party.create({
    data: input,
  })
}

export const updateParty = ({ id, input }) => {
  return db.party.update({
    data: input,
    where: { id },
  })
}

export const deleteParty = ({ id }) => {
  return db.party.delete({
    where: { id },
  })
}

export const Party = {
  Purchase: (_obj, { root }) => {
    return db.party.findUnique({ where: { id: root?.id } }).Purchase()
  },
}
