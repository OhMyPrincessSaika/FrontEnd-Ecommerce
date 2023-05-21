import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import {AiOutlineDelete} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { getUserCart, removeFromCart } from '../features/user/userSlice';
import CartItem from '../components/CartItem';
import { useStateContext } from '../app/ContextProvider';
import NoDataFound from '../components/NoDataFound';
const Cart = () => {
  const {setTotalCartAmount,setTotalQuantityOfCart} = useStateContext();
 
  const [total,setTotal] = React.useState(0);
  const [carts,setCarts] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserCart());
  },[]);
  const cartSel = useSelector((state) =>  state.user.cart);
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
  React.useEffect(() => {
    if(getTokenFromLocalStorage?.token) {
        setCarts(cartSel);
        setTotalQuantityOfCart(cartSel?.length);
    }else {
        setCarts([])
    }
  },[cartSel]);
 
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    setTimeout(() => {
        dispatch(getUserCart());
    },1000)
  }
  const handleTotal = (oldPrice,newPrice) => {
     setTotal((prev) =>  prev+newPrice-oldPrice);
  }
  React.useEffect(() => {
    setTotalCartAmount(total);
  },[total])
  
  return (
    <>
        <BreadCrumb title={"Cart"}/>
        <Meta title={"Cart"}/>
        {
          cartSel?.length > 0 
          ?
          <div className="cart-wrapper py-5 home-wrapper-2">
              <div className="container-xxl">
                  <div className="row">
                      {
                          carts?.map((cartItem,i) => {
                              return (
                                  <div key={i}>
                                      <CartItem handleTotal={handleTotal} handleRemoveFromCart={handleRemoveFromCart} cartItem={cartItem}/>
                                  </div>
                              )
                          } )
                      }
                    
                      <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to="/products" className="button">Continue To Shopping</Link>
                          <div className="d-flex  align-items-end flex-column">
                              <h4>Total Price : $ {total} </h4>
                              <p>Taxes and shipping calculated at checkout</p>
                              <Link to="/checkout" className="button">Checkout</Link>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          :
          <NoDataFound/>
        }
    </>

  )
}

export default Cart