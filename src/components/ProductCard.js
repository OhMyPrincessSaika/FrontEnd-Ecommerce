import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import {BsCart3} from 'react-icons/bs';
import {GrCompare} from 'react-icons/gr';
import {AiOutlineEye,AiTwotoneHeart,AiOutlineHeart} from 'react-icons/ai';
import LazyImage from './LazyImage';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { addToWishList, removeFromWishList } from '../features/products/productSlice';
import { getUserWishlist } from '../features/user/userSlice';
import Placeholder from './Placeholder';
import ProductPlaceholder from './ProductPlaceholder';
const ProductCard = (props) => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = React.useState(true);
  const userSel = useSelector((state) => state.auth.loginUser);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if(userSel.user !== undefined) {
      dispatch(getUserWishlist());
    }
  },[])
 
  const [isInWishlist,setInWishlist] = React.useState(false);
  const wishlistSel = useSelector((state) =>  state.user.wishlist)
  const {grid,isStore,product,setWishList} = props;
  
  const handleClick = (id) => {
    const token = localStorage.getItem('token')
    console.log(token);
    try{
      if(token !== undefined) {
        if(isInWishlist) {
           dispatch(removeFromWishList(id));
          setInWishlist(false);
        }else {
      
           dispatch(addToWishList(id));
          setInWishlist(true);
       
      }
      }else {
      
        navigate('/login')
      }
     
    }catch(err) {
      toast.error(err.message);
    }
  }
  const ratingChanged = (e) => {
    console.log(e);
  }
  const handleLoaded = () => {
  
    setIsLoading(false);
  }
  const productExist=  wishlistSel.find((wishlist) => { 
    console.log('find function called')
    return wishlist.product._id.toString() == product._id.toString()
  })
   React.useEffect(() => {
    if(productExist!== undefined) {
      setInWishlist(true);
    }else {
      setInWishlist(false);
    }
  },[productExist])
 
  return (
    <>
      {isLoading &&
        <ProductPlaceholder/>
      }
      <div key={props.index} style={{display:isLoading ? 'none' : 'block'}} className={`m-1   w-${props.w}`}>
          
          <div  className="product-card position-relative" style={{padding:props.screenWidth < 532 ? '10px':'15px'}}>
              <div className="wishlist-icon position-absolute">
               
              </div>
              <Link to={`/product/${product?._id}`}>
                <div className="product-img">
                    {product?.images?.map((image,i) => {
                    const newUrl = `https://res.cloudinary.com/dhtjmbn8s/image/upload/w_${props.screenWidth < 532 ? '280' : '700'},h_${props.screenWidth < 532 ? '320' : '800'},c_fill/v1682753831/${image.public_id}.jpg`
                    return <LazyImage
                    id={`image${i}`} 
                    key={i}
                    src={newUrl} 
                    className="img-fluid" 
                    alt="product"
                    handleLoaded={handleLoaded}
                    />
                    })}
                </div>
              </Link>
              <div className="d-flex align-items-top w-100 justify-content-between mt-2">
                    <h5 className={`product-title`} style={{fontSize : props.screenWidth < 532 ? '14px' : '16px'}}>
                        {product?.title}
                    </h5>
                    <button 
                      type="button"
                      className="border-0 bg-transparent "
                      onClick={() => handleClick(product?._id) }
                      > 
                        {
                          isInWishlist ?
                          <AiTwotoneHeart className={`fs-5 text-danger`}/> 
                          :
                          <AiOutlineHeart className={`fs-5 text-danger`}/>
                        }
                    </button>
              </div>
              <div className="product-details">
                  <h6 className="brand" style={{fontSize : props.screenWidth < 532 ? '12px' : '14px'}}>{product?.brand}</h6>
                  <ReactStars
                      className="mb-2"
                      count={5}
                      readOnly
                      size={24}
                      value={product?.totalRating}
                      edit={false}
                      activeColor="#ffd700"
                  />
                  <p className={`description ${grid === 12 ? `d-block` : `d-none`}`}
                  dangerouslySetInnerHTML={{__html : product?.description}}
                  >
                  
                  </p>
                  <p className={`price ${props.screenWidth < 532 ? 'mt-0 mb-0' : 'mt-2'}`} style={{fontSize:props.screenWidth < 532 ? '13px' : '16px',fontWeight:'bold'}}>$ {product?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-1">
                  <Link to="/">
                    <GrCompare className="fs-5 text-dark"/>
                  </Link>
                  <div to="/" style={{cursor:'pointer'}} onClick={() => navigate(`/product/${product?._id}`)}>
                    <AiOutlineEye className="fs-5 text-dark"/>
                  </div>
                  <Link to='/'>
                    <BsCart3 className="fs-5 text-dark"/>
                  </Link>
                </div>
              </div>
          </div>
      
        
      </div>
    </>
   
       
  )
}

export default ProductCard