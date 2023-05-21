import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch,useSelector } from 'react-redux';
import {registerUser} from '../features/auth/authSlice';
import * as yup from 'yup';
import {toast} from 'react-toastify'
import {useFormik} from 'formik';
const SignUp = () => {
    const dispatch = useDispatch();
    const schema = yup.object().shape({
    firstname : yup.string().required('First Name is required'),
    lastname : yup.string().required('lastname is required'),
    email : yup.string().required('email is requied').email('email should be valid'),
    phonenum : yup.string().required('mobile is required'),
    password: yup.string().required('password is required')
    })
    const formik = useFormik({
        initialValues : {
            firstname : '',
            lastname : '',
            email : '',
            phonenum : '',
            password: ''
        },
        validationSchema: schema,
        onSubmit : (values) => {
            alert(JSON.stringify(values));
            try {
                dispatch(registerUser(values));
            }catch(err) {
                toast.error(err.message)
            }
        }
    })
 
  return (
    <>
        <Meta title={"Sign Up"}/>
        <BreadCrumb title={"Sign Up"}/>
        <div className="signup-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">Sign Up</h3>
                        <form 
                        onSubmit={formik.handleSubmit}
                        action="" 
                        className="flex-column d-flex gap-3">
                            <div>
                                <input 
                                type="text" 
                                name="firstname" 
                                value={formik.values.firstname}
                                onChange={formik.handleChange('firstname')}
                                placeholder="FirstName" 
                                className="form-control"/>
                            </div>
                            <div className="error">
                                {
                                    formik.touched.firstname && formik.errors.firstname
                                }
                            </div>
                            <div>
                                <input 
                                type="text" 
                                name="lastname" 
                                value={formik.values.lastname}
                                onChange={formik.handleChange('lastname')}
                                placeholder="LastName" 
                                className="form-control"/>
                            </div>
                            <div className="error">
                                {
                                    formik.touched.lastname && formik.errors.lastname
                                }
                            </div>
                            <div>
                                <input 
                                name="email"
                                type="email" 
                                value={formik.values.email}
                                onChange={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                placeholder="Email"
                                className="form-control"/>
                            </div>
                            <div className="error">
                                {
                                    formik.touched.email && formik.errors.email
                                }
                            </div>
                            <div>
                                <input 
                                onChange={formik.handleChange('phonenum')}
                                onBlur={formik.handleBlur('phonenum')}
                                name="phonenum"
                                value={formik.values.phonenum}
                                type="tel" 
                                placeholder="Mobile Number" 
                                className="form-control"/>
                            </div>
                            <div className="error">
                                {
                                    formik.touched.phonenum && formik.errors.phonenum
                                }
                            </div>
                            <div>
                                <input 
                                type="password" 
                                placeholder="Password" 
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                className="form-control"/>
                            </div>
                            <div className="error">
                                {
                                    formik.touched.password && formik.errors.password
                                }
                            </div>
                            <div className="d-flex  w-100 justify-content-center gap-1 align-items-center">
                                <button className="button border-0" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp