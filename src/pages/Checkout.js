import React from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi';
import {useSelector,useDispatch} from 'react-redux';
import {useStateContext} from '../app/ContextProvider';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { createOrder } from '../features/order/orderSlice';
import {toast } from 'react-toastify';
const Checkout = () => {
  const [orderItems,setOrderItems] = React.useState([]);
  const {totalCartAmount} = useStateContext();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    firstName : yup.string().required('First Name is required.'),
    lastName : yup.string().required('Last Name is required'),
    address : yup.string().required('Address is required'),
    state: yup.string().required('State is Required'),
    city : yup.string().required('City is required'),
    other :  yup.string().required('This field is required'),
    pinCode : yup.number().required('Postal Code is required'),
    country : yup.string().required('Country is required')
  })
  const formik = useFormik({
    initialValues: {
        firstName :  '',
        lastName :  '',
        address : '',
        state: '',
        city : '',
        other : '',
        pinCode :  '',
        country : ''
    },
    validationSchema: schema,
    onSubmit : (values) => {
      
      
       try {
        dispatch(createOrder({shippingInfo:values,orderItems,totalPrice:totalCartAmount,totalPriceAfterDiscount:totalCartAmount}));
        toast.success('Created Order Successfully')
       }catch(err) {
        console.log(err);
        toast.error('Something went wrong!');
       }
    }
})
  const cartState = useSelector(state => state.user.cart);

  React.useEffect(() => {
    const orders = cartState?.map((order) => {
        return {
            product : order.productId._id,
            color : order.color,
            quantity : order.quantity,
            price : order.price
        }
    })
    setOrderItems(orders);
  },[cartState])
  return (
    <>
        <div className="py-5 home-wrapper-2 checkout-wrapper">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Saika Store</h3>
                            <nav 
                            style ={{"--bs-breadcrumb-divider" : ">"}}
                            aria-label = "breadcrumb">
                   
                     <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="/cart" className="text-dark">Cart</a>
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Information
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item" aria-current="page">
                                        Shipping
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item" aria-current="page">
                                        Payment
                                    </li>
                                </ol>
                            </nav>
                            <h4 className="title">Contact Information</h4>
                            <p className="user-details">
                                saikakawakita69@gmail.com
                            </p>
                            <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-wrap gap-3 justify-content-between">
                                <div className="w-100">
                                    <select 
                                    name="country" 
                                    onBlur={formik.handleBlur('country')}
                                    onChange={formik.handleChange('country')} 
                                    value={formik.values.country}
                                    className="form-control form-select"
                                    id="">
                                        <option value="" disabled>Select Country</option>
                                        <option value="Myanmar" >Myanmar</option>
                                    </select>
                                    <div className="error fs-6 my-3">
                                    {
                                        formik.touched.country && formik.errors.country
                                    }
                                </div>
                                </div>
                               
                                <div className="d-flex align-items-center justify-content-between w-100 gap-2">
                                    <div className="w-100">
                                        <input 
                                        className="form-control" 
                                        placeholder="First Name" 
                                        type="text"
                                        name="firstName"
                                        onChange={formik.handleChange('firstName')}
                                        onBlur={formik.handleBlur('firstName')}
                                        value={formik.values.firstName}
                                        />
                                   
                                    </div>
                                    <div className="w-100">
                                            <input 
                                            className="form-control" 
                                            placeholder="Last Name" 
                                            name="lastName"
                                            onChange={formik.handleChange('lastName')}
                                            onBlur={formik.handleBlur('lastName')}
                                            value={formik.values.lastName}
                                            type="text"/>
                                       
                                    </div>
                                   
                                </div>
                                <div className="d-flex align-items-center justify-content-between w-100">
                                    <div className="error fs-6 my-1 w-100">
                                            {
                                                formik.touched.firstName && formik.errors.firstName
                                            }
                                    </div>
                                    <div className="error fs-6 my-1 w-100">
                                            {
                                                formik.touched.lastName && formik.errors.lastName
                                            }
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input 
                                    className="form-control" 
                                    placeholder="Address"
                                    name="address"
                                    onChange={formik.handleChange('address')}
                                    onBlur={formik.handleBlur('address')}
                                    value={formik.values.address} 
                                    type="text"/>
                                    <div className="error fs-6 my-3">
                                        {
                                            formik.touched.address && formik.errors.address
                                        }
                                    </div>
                                </div>
                               
                                <div className="w-100">
                                    <input 
                                    className="form-control" 
                                    placeholder="Apartment,Suite,etc."
                                    name='other' 
                                    value={formik.values.other}
                                    onChange={formik.handleChange('other')}
                                    onBlur={formik.handleBlur('other')}
                                    type="text"/>
                                      <div className='error fs-6 my-3'>
                                    {
                                        formik.touched.other && formik.errors.other
                                    }
                                </div>
                                </div>
                              
                                <div className="flex-grow-1">
                                    <input 
                                    onChange={formik.handleChange('city')}
                                    onBlur={formik.handleBlur('city')}
                                    value={formik.values.city}
                                    className="form-control"
                                    type="text"
                                    placeholder="City"/>
                                     <div className="error fs-6 my-3">
                                    {
                                        formik.touched.city && formik.errors.city
                                    }
                                </div>
                                </div>
                               
                                <div className="flex-grow-1">
                                    <select name="state" 
                                    onChange={formik.handleChange('state')}
                                    onBlur={formik.handleBlur('state')}
                                    value={formik.values.state}
                                    className="form-control form-select" 
                                    id="">
                                        <option value="" disabled>
                                            Select State
                                        </option>
                                        <option value="Yangon">Yangon</option>
                                        <option value="Mandalay">Mandalay</option>
                                        <option value="TaungGyi">TaungGyi</option>
                                    </select>
                                    <div className="error fs-6 my-3">
                                        {
                                            formik.touched.state && formik.errors.state
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input 
                                    className="form-control"
                                    type="text"
                                    name="pinCode"
                                    value={formik.values.pinCode}
                                    onChange={formik.handleChange('pinCode')}
                                    onBlur={formik.handleBlur('pinCode')} 
                                    placeholder="Postal Code"/> 
                                      <div className='error fs-6 my-3'>
                                    {
                                        formik.touched.pinCode && formik.errors.pinCode
                                    }
                                </div>
                                </div>
                              
                          
                            <div className="w-100 my-4">
                                <div className="d-flex align-items-center justify-content-between">
                                    <Link to="/cart" className="text-dark">
                                        <BiArrowBack/>
                                        Return to Cart
                                    </Link>
                                    <Link to="/cart" className="button">Continue to Shipping</Link>
                                    <button type="submit" className="button">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {
                                cartState?.map((cart,i) => {
                                  return (<div key={i} className="d-flex mt-3 align-items-center gap-1 justify-content-between">
                                        <div className="w-75 d-flex gap-3">
                                            <div className="w-25 position-relative">
                                                <span
                                                style={{top:'2px',right:'2px'}}
                                                className="badge bg-danger rounded-circle position-absolute">
                                                    {cart.quantity}
                                                </span>
                                                <img style={{borderRadius:'10px',width:'100px',height:'120px',objectFit:'cover',objectPosition:'top left'}} src={cart.productId.images[0].url} className="img-fluid" alt="watch"/>
                                            </div>
                                            <div>
                                                <h5 className="title">{cart.productId.title}</h5>
                                                <p className="type">{cart.productId.brand}</p>
                                                <div className='d-flex gap-3 ' > 
                                                    <ul className="ps-0 colors">
                                                        <li className="color" style={{backgroundColor:cart?.productId?.color[0].value}}></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h5>$ {cart.quantity*cart.price}</h5>
                                        </div>
                                    </div>)

                                })
                            }
                        </div> 
                        <div className="d-flex flex-column border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Subtotal</p>
                                <p className="mb-0 total-price">$ {totalCartAmount}</p>
                            </div>   
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price">$ 5</p>
                            </div>   
                        </div>  
                        <div className="d-flex justify-content-between align-items-center py-4 border-bottom">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">$ {totalCartAmount+5}</h5>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout