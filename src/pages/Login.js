import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {loginUser} from '../features/auth/authSlice';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

const Login = () => { 
  const navigate = useNavigate();
  const loginSel = useSelector((state) => state.auth.loginUser);
  const dispatch = useDispatch();
  const [err,setErr] = React.useState('');
  const schema = yup.object().shape({
    email : yup.string().required('Email is required').email('Email should be valid'),
    password : yup.string().required('Password is required')
  })
  React.useEffect(() => {
    
    if(loginSel?.user) {
        navigate('/')
    }
  },[loginSel]);

  const formik = useFormik({
    initialValues : {
        email : '',
        password : ''
    },
    validationSchema :  schema,
    onSubmit : async(values) => {
       
        try{
            await dispatch(loginUser(values)).unwrap();
        }catch(err) {
            console.log(err);
            setErr(err.message);
        }
    }
  })
  return (
    <>
        <BreadCrumb title={"Login"}/>
        <Meta title={"Login"}/>
        <div className="login-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">Login</h3>
                        <form action="" 
                        onSubmit={formik.handleSubmit}
                        className="flex-column d-flex gap-3">
                            <div>
                                <input 
                                type="email" 
                                placeholder="Email"
                                name="email"
                                onChange={formik.handleChange('email')}
                                onBlur ={formik.handleBlur('email')}
                                className="form-control"/>
                            </div>
                            <div>
                                <input 
                                type="password" 
                                name="password"
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                placeholder="Password" 
                                className="form-control"/>
                            </div>
                           
                            <div className="error">
                                <p>{err}</p>
                            </div>
                               
                            <div>
                                <Link to="/forgot-password">Forgot Password</Link>
                            </div>
                            <div className="d-flex jusitfy-content-center gap-1 align-items-center">
                                <button className="button border-0" type="submit">Login</button>
                                <Link to="/sign-up" className="button  border-0 signup">Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login