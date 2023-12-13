import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { MdDeleteForever } from 'react-icons/md'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'

const CREATE_SALE_MUTATION = gql`
  mutation CreateSaleMutation($input: CreateSaleInput!,$id: Int) {
    createSale(input: $input,id: $id) {
      id
    }
  }
`

const NewOrdersForm = ({ neworder, bottles, menus, id }) => {
  const [orderDrinkArray, setOrderDrinkArray] = useState([])
  // const [orderFoodArray, setOrderFoodArray] = useState([])
  const [foodItemList, setFoodItemList] = useState([])
  const [total,setTotal] = useState({'total':0,'disc':0,'disamt':0,'grand_total':0})
  const [discount,setDiscount] = useState(0)
  const [orderId,setOrderId] = useState(neworder[0]?.id || 0)
  const [createSale, { loading, error }] = useMutation(CREATE_SALE_MUTATION, {
    onCompleted: () => {
      toast.success('Order Saved')
      navigate(routes.orders())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(()=>{
    if(neworder[0]){
      let oda = neworder[0]
      setOrderDrinkArray(oda.bottles)
      // setTotal(oda.total)
      setDiscount(oda.total.disc)
      console.log(oda)
    }
  },[neworder])


  const goBack = () =>{
    navigate(routes.orders())
  }

  const onSubmit = (status,occupied) => {
    // props.onSave(data, props?.sale?.id)
    console.log(status,occupied)
    const result = orderDrinkArray.filter(item => item.id);
    let obj = result.map((item)=>{
      let ob = {
        id:item.id,
        quantity:parseInt(item.quantity)

      }
      return ob
    })
    let data = {
      bottles:orderDrinkArray,
      total:total,
      status,
      tableId:id,
      orders:result,
      occupied

    }



    console.log(result,obj)
    createSale({ variables: { input:data,id:orderId } })

  }

  const addDrinkItem = () => {
    setOrderDrinkArray((item) => [...item, { 'name': '', 'quantity': '', 'price': '', 'total': '','id':0 }])
  }

  const deleteDrinkItem = (index) => {
    setOrderDrinkArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });
  }


  // const addFoodItem = () => {
  //   setHomoMedicineArray((item) => [...item, { 'medicine Name': '', 'amount': '' }])
  // }

  // const deleteFoodItem = (index) => {
  //   setMedicineArray((array) => {
  //     const newArray = [...array];
  //     newArray.splice(index, 1);
  //     return newArray;
  //   });
  // }

  useEffect(() => {
    let obj = []
    const ob1 = bottles.map((item) => {
      let ob = { label: `${item.product.name} - ${item.quantity}`, value: `${item.product.name}`, data: item }
      return ob;
    })
    const ob2 = menus.map((item) => {
      let ob = { label: `${item.name}`, value: `${item.name}`, data: item }
      return ob;
    })
    setFoodItemList([...ob1, ...ob2])

  }, [bottles, menus])

  useEffect(()=>{
    const to = orderDrinkArray.reduce((prev,item)=>prev+=item.total,0)
    let disc = discount || 0

    let dis = to * parseFloat(disc) / 100.0
    let gt =  parseFloat(parseFloat(to - dis).toFixed(2))


    setTotal({
      'total': parseFloat(to),
      'disc':disc,
      'disamt':dis,
      'grand_total':gt

    })
  },[orderDrinkArray,discount])



  return (
    <div className="rw-form-wrapper">
      <Form  >
        <FormError

          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <div className="p-2 w-full shadow-sm bg-white text-black ">
          <div className=" grid grid-cols-7 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-3 justify-center">Name</div>
            <div className="flex col-span-1 justify-center">Price</div>
            <div className="flex col-span-1 justify-center">Quantity</div>
            <div className="flex col-span-1 justify-center">Total</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              orderDrinkArray.map((item, index) => {
                return (
                  <>
                    <AddItemsBody key={index} item={item}
                      orderDrinkArray={orderDrinkArray}
                      setOrderDrinkArray={setOrderDrinkArray}
                      del={deleteDrinkItem}
                      index={index}
                      foodItemList={foodItemList}

                    />
                  </>
                )
              })

            }
          </div>



          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addDrinkItem}>Add Items</div>
          </div>


          <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Total
          </Label>
          <div className="flex">
            <TextField
              name="total"
              // defaultValue={props.saleMedicine?.total}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={parseFloat(total.total.toFixed(2))}
            />
          </div>
          <FieldError name="total" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>


          <Label
            name="discount"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount % :-
          </Label>

          <div className='flex'>


            <TextField
              name="discount"
              // defaultValue={props.saleMedicine?.discount}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>

          <FieldError name="discount" className="rw-field-error" />
          <Label
            name="discountamt"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount Amount :-
          </Label>

          <div className='flex'>


            <TextField
              name="discountamt"
              // defaultValue={props.saleMedicine?.discount}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              value={parseFloat(total.disamt.toFixed(2))}
              disabled={true}
            // value=
            />
          </div>

          <FieldError name="discountamt" className="rw-field-error" />
        </div>










        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="grand_total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Grand total
          </Label>
          <div className="flex">
            <TextField
              name="grand_total"
              // defaultValue={props.saleMedicine?.grand_total}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={total.grand_total}
            />
          </div>
          <FieldError name="grand_total" className="rw-field-error" />
        </div>


        <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={goBack}>Go Back</div>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={()=>onSubmit('pending',true)}>Save</div>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={()=>onSubmit('completed',false)}>Print</div>
          </div>



        </div>


      </Form>
    </div>
  )
}

const AddItemsBody = ({ item, orderDrinkArray, del, setOrderDrinkArray, index, foodItemList }) => {
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')
  const [total, setTotal] = useState(0)

  const itemNameChange = (item) => {
    if (!item) {
      return
    }

    setItemName(item)
    let rate = 0
    let id = 0
    try {
      rate = item.data.product.rate
      id = item.data.product.id
    } catch (error) {
      rate = item.data.rate
    }
    setOrderDrinkArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        'name': item?.value || '',
        'price':rate,
        id

      };
      return newArray;
    });
    setPrice(rate)


  }

  useEffect(() => {
    setOrderDrinkArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        'quantity': qty || '',
        'total':qty*price

      };
      return newArray;
    });
    setTotal(qty * price)

  }, [qty])



  useEffect(() => {
    console.log(item)
    if (item['name']) {
      console.log(item['name'])
      setItemName({ value: item['name'], label: item['name'] })

    }
    else{
      setItemName('')
    }
    if(item['price']){
      setPrice(item.price)
    }else{
      setPrice('')
    }
    if (item['quantity']) {
      setQty(item.quantity)
    }else{
      // setQty('')
    }


  }, [item])

  return (
    <>
      <div className=" col-span-3 ">
        <Select options={foodItemList} isClearable={true}
          onChange={itemNameChange}
          value={item['name'] !== '' ? itemName : ''}
        />
      </div>

      <div className="flex col-span-1 justify-center items-center text-black">
        <span>
          {price}

        </span>

      </div>

      <div className="flex col-span-1 justify-center text-black">
        <input type="number" name="amount" className="border border-black p-2 w-24" placeholder="Amount" id="" value={qty}

          onChange={(e) => setQty(e.target.value)}
        />
      </div>

      <div className="flex col-span-1 justify-center items-center text-black">
        <span>

          {total}
        </span>
      </div>

      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600 p-2' onClick={del.bind(this, index)}>
          <MdDeleteForever className="" />
        </span>
      </div>

    </>
  )

}

export default NewOrdersForm
