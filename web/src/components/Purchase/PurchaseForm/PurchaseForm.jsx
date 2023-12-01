import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'
import { useEffect, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import Select from 'react-select'

const PurchaseForm = (props) => {


  // const formatDate = () =>{
  //   const date = new Date()
  //   return `${date.getFullYear()}-${date.getMonth()+1 > 9 ? date.getMonth()+1 : '0'+date.getMonth()+1 }-${date.getDate()>9 ? date.getDate() : '0'+date.getDate()}`

  // }


  const [partyName, setPartyNames] = useState([])
  const [tyreType, setTyreType] = useState([])
  // const [date,setDate] = useState(new Date().toLocaleDateString())
  const [purchaseArray, setPurchaseArray] = useState([])
  const [d, setD] = useState('')
  const [products,setProducts] = useState([])
  const [partyId,setPartyId] = useState(0)
  const [total,setTotal] = useState({})

  const addPurchase = () => {
    // quantity: Int!
    // extra: JSON
    // productId: Int!
    setPurchaseArray((item) => [...item, {
      product_name: '', rate_for_cb: 0, rate_for_bottle: 0, cb: 0, btls: 0, amount: 0,productId:0,quantity:0
    }])
    // setNoOfDoctorCharges((item) => item + 1)
  }


  const deleteProduct = (index) => {
    setPurchaseArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    })
  };


  useEffect(() => {
    const arrPat = props.parties.map((item) => {
      const obj = { 'label': item.name, 'value': item.id }
      return obj
    })
    // // console.log(arrPat)
    setPartyNames(arrPat)
    const arrPro = props.products.map((item) => {
      const obj = { 'label': item.name, 'value': item.name,'info':item }
      return obj
    })
    // // console.log(arrPro)
    setProducts(arrPro)


    // const obj = props.tyreTypes.map((item) => {
    //   const obj = { 'label': item.name, 'value': item.id }
    //   return obj
    // })
    // setTyreType(obj)

    // console.log(obj2)
  }, [])

  const modifyParty = (item) => {
    if(!item){
      setPartyId(0)
      return
    }
    setPartyId(item.value)


  }
  useEffect(()=>{
    const to = purchaseArray.reduce((prev,item)=> item.amount,0)
    setTotal(()=>{
      return {
        'totalAmt':to
      }
    })

  },[purchaseArray])



  const onSubmit = () => {
    const hasEmptyValue = purchaseArray.some((obj) => {
      // Check if any value in the object is empty
      return Object.values(obj).some((value) => value === null || value === '');
    });
    if(hasEmptyValue || !partyId || d=='')
    {
      toast.error('Enter All The Details')
      return
    }
    const btls = purchaseArray.map((item)=>{
      return {
        quantity: item.quantity,
        productId: item.productId
      }
    })
    const data = {
      invoiceNo: ''+Math.random(),
      date: new Date(d),
      bottles: purchaseArray,
      total: total,
      partyId: partyId,
      btls:btls
    }

    props.onSave(data, props?.purchase?.id)
  }

  return (
    <>
      <div className="m-3 p-3">
        <div className="shadow-md rounded-md">

          <div className="p-2 w-full shadow-xs ">
            <div className='flex items-center space-x-4 mb-5'>


              <div className='flex-1'>
                <Select options={partyName} onChange={modifyParty} isClearable={true} placeholder={'Select Party Name'} />
              </div>
              <div>

                <label htmlFor="datePicker" className='text-xl font-bold pr-6' >Select a date:</label>
                <input type="date" id="datePicker" name="selectedDate" className='text-xl font-bold'
                value={d}
                onChange={(e) => setD(e.target.value)} />
              </div>
            </div>
            <div className=" grid grid-cols-8 grid-flow-row gap-x-2 gap-y-2">


              <div className=" col-span-3 ">Item Name</div>
              <div className=" col-span-1 ">Rate For CB</div>
              <div className=" col-span-1 ">CB's</div>
              <div className=" col-span-1 ">Bottle</div>
              <div className=" col-span-1 ">Amount</div>

              <div className=" col-span-1 ">Action</div>

              {
                purchaseArray.map((item, index) => {
                  return (
                    <>
                      <PurchaseArray key={index}
                        products={products}
                        setPurchaseArray={setPurchaseArray}
                        del={deleteProduct}
                        index={index}
                        item = {item}
                      />
                    </>
                  )
                })

              }
            </div>

            <div className='flex justify-center mt-2'>
              <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addPurchase}>Add Bottle Payments</div>
            </div>
            <div className='flex  justify-center mt-2'>
              <div className='bg-green-900 p-2 text-white rounded-3xl hover:text-green-950 hover:bg-slate-300 cursor-pointer' onClick={onSubmit}>Save changes</div>
            </div>

          </div>
        </div>
      </div>


    </>
  )
}

const PurchaseArray = ({
  del, setPurchaseArray, index, products,item
}) => {
  const [productName,setProductName] = useState('')
  const [rate_for_cb,set_rate_for_cb] = useState(0)
  const [cbs,setCbs] = useState(0)
  const [btls,setBtls] = useState(0)
  const [qty,setQty] = useState(0)
  const [amount,setAmount] = useState(0)
  const addProductName = (item) => {
    if (!item) {
      return
      setProductName('')
    }
    setPurchaseArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        product_name: item.value,
        productId:item.info.id,
        productInfo:item.info

      };
      return newArray;
    });
    try {
      let q = item.info.Bootle[0].quantity
      setQty(q)
    } catch (error) {
      setQty(0)

    }
    console.log(item)
    setProductName(item)
  }

  useEffect(()=>{
    if(item.product_name)
    {
      setProductName({label:item.product_name,value:item.product_name,info:item.productInfo})
      // setProductName({label:'adsa',value:'asjdak'})
    }
    if(item.rate_for_cb)
    {
      set_rate_for_cb(item.rate_for_cb)
    }
    if(item.cb)
    {
      setCbs(item.cb)
    }
    if(item.btls)
    {
      setBtls(item.btls)
    }
  },[item])

  useEffect(()=>{

    if(rate_for_cb==='' || cbs==='' || btls === '' || productName=="" )
    {
      return
    }
    let rate_per_bootle = parseFloat((rate_for_cb / productName.info.btl_per_case).toFixed(2))
    let totalBtl = parseInt(cbs * productName.info.btl_per_case) + parseInt(btls) + qty
    let amt = rate_per_bootle * totalBtl
    amt = parseFloat(amt.toFixed(2))
    // console.log(amt,"sfssedf",rate_per_bootle,totalBtl)
    setAmount(amt)
    setPurchaseArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        rate_for_cb:rate_for_cb,
        rate_for_bottle:rate_per_bootle,
        cb:cbs,
        btls:btls,
        amount:amt,
        quantity:totalBtl
      };
      return newArray;
    });


  },[rate_for_cb,cbs,btls])

// {/* product_name:'',rate_for_cb:0,rate_for_bottle:0,cb:0,btls:0,amount:0 */},productId:0,quantity:0

  return (
    <>

      <div className=" col-span-3  ">
        <Select options={products} isClearable={true} onChange={addProductName}
        value={item.product_name != '' && productName}
        />
      </div>


      <div className=" col-span-1    ">
        <input type="number" className="bg-slate-900 text-white p-2 rounded-md w-28" name="rate_for_cb" id="" value={rate_for_cb} onChange={(item) => set_rate_for_cb(item.target.value)} required/>

      </div>
      <div className=" col-span-1    ">
        <input type="number" className="bg-slate-900 text-white p-2 rounded-md w-28" name="cb" id="" value={cbs} onChange={(item) => setCbs(item.target.value)} required/>

      </div>
      <div className=" col-span-1    ">
        <input type="number" className="bg-slate-900 text-white p-2 rounded-md w-28" name="btls" id="" value={btls} onChange={(item) => setBtls(item.target.value)} required/>

      </div>
      <div className=" col-span-1    ">
        <input type="number" className="bg-slate-900 text-white p-2 rounded-md w-28" name="btls" id="" value={amount}  disabled />

      </div>


      <div className=" col-span-1  flex items-center ">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )
}


export default PurchaseForm
