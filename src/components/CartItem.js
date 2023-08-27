import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { updateUserCart } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';
const CartItem = (props) => {
    const dispatch = useDispatch();
    const {cartItem,handleRemoveFromCart,handleTotal} = props;
    console.log(cartItem);
    const [quantity,setQuantity] = React.useState(cartItem?.quantity);
    const handleQuantityChange = (e) =>{
      const newQuantity = e.target.value;
      const oldPrice = quantity * cartItem.price;
      const newPrice = newQuantity * cartItem.price;
      handleTotal(oldPrice,newPrice);
      setQuantity(newQuantity);
    }
    React.useEffect(() => {
        handleTotal(0,quantity*cartItem.price);
    },[])
    React.useEffect(() => {
      
        let timeoutId;
        const handleChange = () => {
            if(timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                const data = {id : cartItem?._id,cartData : {quantity}}
                dispatch(updateUserCart(data));
            },5000);
        }
        handleChange();
        
        return  () => {
            clearTimeout(timeoutId);
        }
    },[quantity])
  
   
  return (
    <div  className="col-12">
    <div className="cart-header d-flex justify-content-between align-items-center">
        <h4 className="cart-col-1">Product</h4>
        <h4 className="cart-col-2">Price</h4>
        <h4 className="cart-col-3">Quantity</h4>
        <h4 className="cart-col-4">Total</h4>
    </div>
    <div className="cart-data py-3 mb-2 gap-1 d-flex justify-content-between align-items-center">
        <div className="cart-col-1 d-flex align-items-center">
            <div className="w-25">
                <img src={cartItem?.productId?.images[0].url} className="img-fluid" alt="product-img"/>
            </div>
            <div className="w-75 ms-3">
              
                <p >{cartItem?.productId?.title}</p>
                <div className='d-flex gap-3 ' >Color : <ul className="ps-0 colors">
                       {
                        cartItem?.color?.map((color) => {
                            return   <li className="color" style={{backgroundColor:color}}></li>
                        })
                       }
                    </ul>
                </div>
                {
                    [...new Set(cartItem?.size)].map((value) => {
                        return  <span className="badge size  border border-1 bg-white text-dark">{value}</span>
                    })
                }
               
            </div>
        </div>
        <div className="cart-col-2">
            <h5 className="price">$ {cartItem?.productId?.price}</h5>
        </div>
        <div className="cart-col-3 d-flex align-items-center gap-1">
            <div>
                <input
                className="form-control" 
                type="number" 
                name="" 
                onChange={handleQuantityChange}
                value={quantity}
                min={1}
                max={10}
                id=""/>
            </div>
            <div>
                <AiOutlineDelete 
                style={{cursor:'pointer'}}
                onClick={() => {handleRemoveFromCart(cartItem?._id)}}
                className="text-danger"/>
            </div>
        </div>
        <div className="cart-col-4">
        <h5 className="price">$ {quantity * cartItem?.price}</h5>
        </div>
    </div>
    </div>
  )
}

export default CartItem