import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import { getForgotPasswordToken } from '../features/user/userSlice';
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [msg,setMsg] = React.useState('We will send you an email to reset your password');
  const schema = yup.object().shape({
    email : yup.string().required('email is required').email('email should be valid')
  })
  const formik = useFormik({
    initialValues : {
        email : ''
    },
    validationSchema : schema,
    onSubmit : async(values) => {
        try {
           await dispatch(getForgotPasswordToken(values)).unwrap();
           setMsg('We\'ve send password reset code to your email')
        }catch(err) {
            console.log(err);
        }
    }
  })
  return (
    <>
        <Meta title={"Forgot Passowrd"}/>
        <BreadCrumb title={"Forgot Password"}/>
        <div className="login-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">Reset Password</h3>
                        <p className="text-center mt-2 mb-3">{msg}</p>
                        <form action="" className="flex-column d-flex gap-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <input 
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                placeholder="Email" 
                                className="form-control"/>
                            </div>
                            <div className='error' style={{fontSize:'14px'}}>
                                {
                                    formik.touched.email && formik.errors.email
                                }
                            </div>
                            <div className="d-flex flex-column jusitfy-content-center gap-1 align-items-center">
                                <button className="button border-0" type="submit">Send Code</button>
                                <Link to="/login">cancel</Link>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword