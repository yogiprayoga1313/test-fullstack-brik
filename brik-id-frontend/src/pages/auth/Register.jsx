import { Link } from "react-router-dom"
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import propTypes from 'prop-types';
import { clearMessage } from "../../redux/reducers/auth";
import { asyncRegisterAction } from "../../redux/actions/atuh";
import * as Yup from 'yup';
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";



const validationSechema = Yup.object({
  email: Yup.string().email('Email is invalid'),
  password: Yup.string().required('Password is invalid')
})

const FormRegister = ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
  const errorMessage = useSelector(state => state.auth.errorMessage)
  const sucessMessage = useSelector(state => state.auth.sucessMessage)

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-7 w-[400px] justify-center items-center'>
      {errorMessage && (<div>
        <div className="alert alert-error w-[300px] danger text-[11px] flex justify-center items-center">{errorMessage}</div>
      </div>)}
      {sucessMessage && (<div>
        <div className="alert alert-success w-[300px] danger text-[11px] flex justify-center items-center">{sucessMessage}</div>
      </div>)}
      <div>
        <input name="fullName" type="text" placeholder="Fullname" className="input input-bordered w-[400px] max-w-xs"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.fullName} />
      </div>
      <div>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-[400px] max-w-xs"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email} />
          {errors.email && touched.email &&
          (<label className="label">
            <span className="label-text-left text-error text-xs ">{errors.email}</span>
          </label>
          )}
      </div>
      <div>
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-[400px] max-w-xs"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password} />
          {errors.password && touched.password &&
          (<label className="label">
            <span className="label-text-left text-error text-xs ">{errors.password}</span>
          </label>
          )}
      </div>
      <div>
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-[400px] max-w-xs"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword} />
          {errors.password && touched.password &&
          (<label className="label">
            <span className="label-text-left text-error text-xs ">{errors.password}</span>
          </label>
          )}
      </div>
      <button className="btn btn-primary w-[320px] normal-case text-white ">Register</button>
    </form>
  )
}

FormRegister.propTypes = {
  values: propTypes.string,
  errors: propTypes.string,
  touched: propTypes.string,
  handleBlur: propTypes.func,
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
}

function Regsiter() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const formError = useSelector(state => state.auth.formError)
  const token = useSelector(state => state.auth.token)
  const [loadingModal, setLoadingModal] = React.useState(false)


  const doRegister = async (values, { setSubmitting, setErrors }) => {
    setLoadingModal(true)
    dispatch(clearMessage())
    dispatch(asyncRegisterAction(values))

    if (formError.length) {
      setErrors({
        fullName: formError.filter(item => item.param === "fullName")[0].message,
        email: formError.filter(item => item.param === "email")[0].message,
        password: formError.filter(item => item.param === "password")[0].message,
        confirmPassword: formError.filter(item => item.param === "confirmPassword")[0].message,
      })
    }
    setTimeout(() => {
      setLoadingModal(false)
    }, 800)
    setSubmitting(false)


  }

  React.useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [token, navigate]);
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-28 gap-10'>
        <div className='flex flex-col gap-5 justify-center items-center'>
          <div>
            <span className='font-bold text-3xl'>Welcome to Marker!</span>
          </div>
          <div className='flex gap-16 bg-gray-300 w-[300px] h-[50px] justify-center items-center rounded-lg'>
            <div>
              <Link className='text-red-500 font-semibold'>Register</Link>
            </div>
            <div>
              <Link to='/login' className='font-semibold'>Login</Link>
            </div>
          </div>
        </div>
        {/* Register */}
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSechema}
          onSubmit={doRegister}
        >
          {(props) => (
            <FormRegister {...props} />
          )}
        </Formik>
      </div>
      <input type="checkbox" id="loading" className="modal-toggle" checked={loadingModal} />
      <div className="modal">
        <div className="modal-box bg-transparent shadow-none">
          <div className='justify-center flex '>
            <AiOutlineLoading3Quarters className='animate-spin ' color='white' size={60} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Regsiter