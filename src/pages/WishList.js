import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import {useDispatch,useSelector} from 'react-redux';
import { getUserWishlist } from '../features/user/userSlice';
import LazyImage from '../components/LazyImage';
import { removeFromWishList } from '../features/products/productSlice';
import Loading from '../components/Loading';
import NoDataFound from '../components/NoDataFound';
const WishList = () => {
  const [loading,setLoading] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserWishlist());
  },[])
  const wishSel = useSelector((state) => state.user.wishlist);
  console.log(wishSel)
  const removeProductsFromWishList = (id) => {
    setLoading(true);
    dispatch(removeFromWishList(id));
    setTimeout(() => {
        dispatch(getUserWishlist());
        setLoading(false);
    },1000)
  }
  return (
    
        loading 
        ?
        <Loading/>
        :
        <>
            <Meta title={"Wish List"}/>
            <BreadCrumb title={"Wish List"}/>
            <div className="wishlist-wrapper home-wrapper-2 py-5">
                {wishSel?.length < 1 && <NoDataFound/>}
                <div className="container-xxl">
                    <div className="row">
                        {   
                            wishSel?.map((wishlist,i) => {
                            return <div key={i} className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="wish-list-card position-relative">
                                            <img 
                                            onClick={() => {removeProductsFromWishList(wishlist.product._id)}}
                                            src="images/images/cross.svg" 
                                            alt="cross" 
                                            className="position-absolute cross img-fluid"/>
                                    
                                        <div className="wishlist-card-image d-flex bg-white p-2 align-items-center justify-content-center">
                                            <LazyImage src={wishlist.product.images[0].url} width="220" height="250" id={i}/>
                                        </div>
                                        <div className="py-3">
                                            <h5 className="title">{wishlist.product.title}</h5>
                                            <p className="description"
                                            dangerouslySetInnerHTML={{__html : wishlist.product.description}}
                                            ></p>
                                            <h6 className="price">$ {wishlist.product.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            } )
                        }
                    </div>
                </div>
            </div>
        </>
    
  )
}

export default WishList