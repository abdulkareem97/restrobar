import { db } from 'src/lib/db'

export const purchases = () => {
  return db.purchase.findMany()
}

export const purchase = ({ id }) => {
  return db.purchase.findUnique({
    where: { id },
  })
}

export const createPurchase = async ({ input }) => {
  const {btls,...d} = input

  const data = await db.purchase.create({
    data: d,
  })

  btls.map(async (item)=>{
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',item)
    try {
      await db.bottle.create({
        data:{
          quantity:item.quantity,
          productId:item.productId
        }
      })
    } catch (error) {
      return db.bottle.update({
        data: {
          quantity:item.quantity,
        },
        where: { id:item.productId },
      })

    }
  })
  return data
}

export const updatePurchase = ({ id, input }) => {
  return db.purchase.update({
    data: input,
    where: { id },
  })
}

export const deletePurchase = ({ id }) => {
  return db.purchase.delete({
    where: { id },
  })
}

export const Purchase = {
  party: (_obj, { root }) => {
    return db.purchase.findUnique({ where: { id: root?.id } }).party()
  },
}
