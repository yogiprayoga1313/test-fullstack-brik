import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import http from '../helpers/http';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/reducers/auth';

function Home() {
  const token = useSelector(state => state.auth.token)
  const [product, setProduct] = React.useState([])
  const [searchParams, setSearchParams] = useSearchParams('')
  const [sort, setSort] = React.useState('DESC')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedPicure, setSelectedPicture] = React.useState();
  const [pictureURI, setPictureURI] = React.useState('')
  const [categories, setCategories] = React.useState([])
  const [categoriesValue, setcategoriesValue] = React.useState(null);
  const [tabProduct, setTabProduct] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState()


  const getDataProduct = React.useCallback(async () => {
    const { data } = await http().get(`/product?limit=10&sort=${sort}&${searchParams}&page=${tabProduct}`)
    setTotalPage(data.totalPage)
    setProduct(data.results)
  }, [sort, searchParams, tabProduct])

  React.useEffect(() => {
    getDataProduct()
  }, [getDataProduct])

  React.useEffect(() => {
    async function getDataCategory() {
      const { data } = await http().get('/category')
      console.log(data) *
        setCategories(data.results)
    }
    getDataCategory()
  }, [])


  const handleSort = (sort) => {
    setSort(sort)
    // setSort(sort)
    // setMessage(message)

    const elem = document.activeElement;
    elem?.blur();
  }

  const doLogout = () => {
    dispatch(logoutAction()),
      navigate('/login')
  }

  const onSearch = (values) => {
    setSearchParams(`search=${values.search}`);

  };

  const fileToDataUrl = (file) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setPictureURI(reader.result)
    })
    reader.readAsDataURL(file)
  }

  const changePicture = (e) => {
    const file = e.target.files[0]
    setSelectedPicture(file)
    fileToDataUrl(file)
  }

  const createProduct = async values => {
    // setOpenModal(true)
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key] || key === 'description') {
        form.append(key, values[key]);
      }
    });
    if (selectedPicure) {
      form.append('image', selectedPicure);
    }
    if (categoriesValue) {
      form.append('categoryId', categoriesValue);
    }
    const { data } = await http(token).post('/product', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data)
    getDataProduct()
    // setOpenModal(false)
    setcategoriesValue(false)
    // navigate('/createEvents')
  };


  const handlePrevPage = () => {
    if (tabProduct > 1) {
      setTabProduct(tabProduct - 1);
    }
  }

  const handleNextPage = () => {
    if ((tabProduct + 1) <= totalPage) {
      setTabProduct(tabProduct + 1);
    }

  };
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-10 p-3'>
        <div className='font-bold text-3xl mb-10'>Home</div>
        <div>
          <div className='flex justify-center items-center gap-10'>
            <div>
              <Formik
                initialValues={{
                  search: ""
                }}
                onSubmit={onSearch}
              >
                {({ handleBlur, handleChange, handleSubmit, values }) => (
                  <>
                    <div className='md:flex-row flex-col flex gap-5 justify-center items-center'>
                      <form onSubmit={handleSubmit} className='md:flex-row  flex flex-col gap-5'>
                        <div>
                          <input
                            type="text"
                            placeholder="search"
                            className="input input-bordered md:w-[700px]"
                            name='search'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.search} />
                        </div>
                        <div>
                          <button type='submit' className='normal-case text-white btn btn-primary st'>
                            Search
                          </button>
                        </div>
                      </form>
                      <div>
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn m-1"><FiMenu /></label>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li onClick={() => { handleSort('DESC') }}><a className='text-black'>Update</a></li>
                            <li onClick={() => { handleSort('ASC') }}><a className='text-black'>Lastes</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </div>
          <div className='md:flex-row flex flex-col justify-center items-center gap-10 mt-[50px]'>
            <div className='flex flex-col  gap-5'>
              <div className='flex justify-center items-center rounded-lg'>
                {/* <Link>Add Product</Link> */}
                {/* The button to open modal */}
                <label htmlFor="my_modal_6" className="btn btn-ghost border border-indigo-600 w-[140px] h-10 normal-case ">Add Product</label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Product</h3>
                    <p className="py-4">Input data for new product!</p>
                    <Formik
                      initialValues={{
                        categoryId: '',
                        sku: '',
                        name: '',
                        description: '',
                        weight: '',
                        width: '',
                        length: '',
                        height: '',
                        price: ''
                      }}
                      onSubmit={createProduct}>
                      {({ handleBlur, handleChange, handleSubmit, values }) => (
                        <>
                          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <div className='md:flex-row flex flex-col gap-5'>
                              <div className='flex flex-col gap-4'>
                                <div className='border border-black w-[200px] h-[250px]'>
                                  {selectedPicure ? (<img src={pictureURI} alt="image" className='w-[200px] h-[248px] bg-cover' />) : (<span className=' flex justify-center items-center mt-28 font-bold text-red-500'>No Images</span>)}
                                </div>
                                <div>
                                  <input type="file" name='image' onChange={changePicture} />
                                </div>
                                <div>
                                  <div className='flex flex-col gap-3 form-control'>
                                    <span>Category</span>
                                    <select
                                      className="select select-primary text-black"
                                      name="categoryId"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.categoryId}
                                    >
                                      {categories.map(item => (
                                        <>
                                          <option key={item.id} value={item.id}>
                                            {item.name}
                                          </option>
                                        </>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className='flex flex-col gap-2'>
                                  <input
                                    type="text"
                                    name='name'
                                    placeholder="Name"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                  <input
                                    type="text"
                                    name='price'
                                    placeholder="Price"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.price}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                  <input
                                    type="text"
                                    name='sku'
                                    placeholder="sku"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.sku}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                  <input
                                    type="text"
                                    name='weight'
                                    placeholder="weight"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.weight}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                  <input
                                    type="text"
                                    name='width'
                                    placeholder="Width"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.width}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                  <input
                                    type="text"
                                    name='length'
                                    placeholder="Length"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.length}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                  <input
                                    type="text"
                                    name='height'
                                    placeholder="Height"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.height}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                  <input
                                    type="text"
                                    name='description'
                                    placeholder="Description"
                                    className="input input-bordered w-full max-w-xs"
                                    value={values.description}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                </div>
                              </div>
                            </div>
                            <button className='btn btn-ghost border border-indigo-600 w-[140px] h-10'>Save</button>
                          </form>
                        </>
                      )}
                    </Formik>
                    <div className="modal-action">
                      <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border border-red-600 w-[140px] h-10 flex justify-center items-center rounded-lg'>
                <Link onClick={doLogout} className='text-red-500'>Logout</Link>
              </div>
            </div>
            <div className='md:grid md:grid-cols-5 grid grid-cols-1 gap-10'>
              {product.map(product => {
                return (
                  <>
                    <div key={product?.id} className='border border-black w-[200px] h-[230px]'>
                      <div className=''>
                        <div className='w-[200px] h-[150px]'>
                          <img className='w-[198px] h-[150px]' src={product?.image} alt="" />
                        </div>
                        <Link to={`product/${product?.id}`} className='flex flex-col border-t border-black justify-center items-center h-[70px] '>
                          <span className='font-bold text-xl'>{product?.name.slice(0, 15)}</span>
                          <span className='text-red-500 font-semibold'>Rp.{product?.price}</span>
                        </Link>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 mt-10 mb-10">
            <div className="flex justify-center items-center">
              <div>
                <button className="btn btn-base-100 shadow-lg shadow-black-500/70" onClick={handlePrevPage}><AiOutlineArrowLeft size={20} color="black" /></button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <button className="btn btn-primary shadow-lg shadow-black-500/70" onClick={handleNextPage}><AiOutlineArrowRight size={20} color="white" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home