import React from 'react'
import { useParams } from 'react-router-dom'
import http from '../helpers/http'

function DetailProduct() {
  const {id} = useParams()
  const [detailProduct, setDetailproduct] = React.useState([])

  const getDetailProduct = React.useCallback(async () => {
    const { data } = await http().get(`/product/${id}`)
    console.log(data)
    setDetailproduct(data.results)
  }, [id])

  React.useEffect(() => {
    getDetailProduct()
  }, [getDetailProduct])
  return (
    <div className='flex flex-col justify-center items-center gap-10 mt-10'>
      <div>
        <div className='font-bold text-3xl'>Detail Product</div>
      </div>
      <div key={detailProduct?.id} className='md:flex-row flex-col flex gap-10 mb-10 p-5'>
        <div className='border-4 border-black md:w-[500px] md:h-[530px] w-[300px]'>
          <img className='md:w-[500px] w-[300px] md:h-[523px] h-[300px]' src={detailProduct?.image} alt="" />
        </div>
        <div className='flex flex-col gap-7'>
          <div className='border border-blue-400 w-[100px] h-[40px] rounded-lg flex justify-center items-center'>
            <span className='text-blue-700'>{detailProduct?.Category?.name}</span>
          </div>
          <div className='font-bold text-3xl'>
            <span>{detailProduct?.name}</span>
          </div>
          <div className='font-semibold opacity-70 text-xl w-[300px]'>
            <span>{detailProduct?.description}</span>
          </div>
          <div className='border border-black items-center justify-around flex p-3 w-[240px]'>
            <div className='grid grid-cols-2 gap-5'>
              <span>Weight: {detailProduct?.weight}</span>
              <span>Width: {detailProduct?.width}</span>
              <span>Length: {detailProduct?.length}</span>
              <span>Height: {detailProduct?.height}</span>
            </div>
          </div>
          <div className='font-bold text-red-600 text-4xl'>
            <span>Rp.{detailProduct?.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct