import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch,useSelector}  from 'react-redux';
import { resetPassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetToken = window.location.pathname.split('/')[2];
  console.log(resetToken)
  const [isValueEqual,setIsValueEqual] = React.useState(true);
  const schema = yup.object().shape({
    password : yup.string().required('new password is required'),
    confirmpassword : yup.string().required('confirm password is required')
  })
  const formik = useFormik({
    initialValues : {
        password : '',
        confirmpassword : ''
    },
    validationSchema : schema,
    onSubmit : async(values) => {
        alert(JSON.stringify(values))
        if(values.confirmpassword === values.password) {
            setIsValueEqual(true);
            try{
                const response = await dispatch(resetPassword({password:values.password,token:resetToken})).unwrap();
                navigate('/login',{replace: true})
            }catch(err) {
                console.log(err);
                toast.error(err.message)
            }
            
        }else {
            setIsValueEqual(false);
        }
    }
  })
  return (
    <>
        <Meta title={"Reset Password"}/>
        <BreadCrumb title={"Reset Password"}/>
        <div className="signup-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">Reset Password</h3>
                        <form action=""
                         className="flex-column d-flex gap-3"
                         onSubmit={formik.handleSubmit}>
                          
                            <div>
                                <input 
                                name="password" 
                                type="password" 
                                placeholder="New Password" 
                                className="form-control"
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                                />
                                <div className='error'>
                                    {
                                        formik.touched.password && formik.errors.password
                                    }
                                </div>
                                
                            </div>
                            <div>
                                <input 
                                name="confirmpassword" 
                                type="password" 
                                placeholder="Confirm Password" 
                                onChange={formik.handleChange('confirmpassword')}
                                onBlur={formik.handleBlur('confirmpassword')}
                                value={formik.values.confirmpassword}
                                className="form-control"/>
                                <div className='error'>
                                    {
                                        formik.touched.confirmpassword && formik.errors.confirmpassword
                                    }
                                </div>
                            </div>
                            <div className="error">
                                {
                                    isValueEqual ? '' : 'password doesn\'t match'
                                }
                            </div>
                            <div className="d-flex  w-100 justify-content-center gap-1 align-items-center">
                                <button className="button border-0" type="submit">OK</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}

export default ResetPassword