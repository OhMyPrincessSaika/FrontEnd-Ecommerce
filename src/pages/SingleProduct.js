import React from 'react'
import BreadCrumb from '../components/BreadCrumb.js';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard.js';
import { Rating } from '@mui/material';
import Magnifier from "react-magnifier";
import Color from '../components/Color';
import {MdFavoriteBorder,MdOutlineCompare} from 'react-icons/md';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { addToWishList, getAllProducts, getProduct, rateAProduct } from '../features/products/productSlice.js';
import { toast } from 'react-toastify';
import { addToCart } from '../features/user/userSlice.js';
import { useStateContext } from '../app/ContextProvider.js';
const SingleProduct = () => { 
  const {user} = useStateContext();
  const [color,setColor] = React.useState('');
  const [star,setStar] = React.useState(0);
  const {screenWidth} = useStateContext();
  const [comment,setComment] = React.useState('');
  const [showComment,setShowComment] = React.useState(false);
  const [popularProducts,setPopularProducts] = React.useState([]);
  const [isProductInCart,setIsProductInCart] = React.useState(false);
  const [size,setSize] = React.useState('');
  const navigate = useNavigate();
  const [quantity,setQuantity] = React.useState(1);
  const userSel = useSelector((state) => state.auth.loginUser);
  const location = useLocation();
  const dispatch = useDispatch();
  const [mainImg,setMainImg] = React.useState('');
  const prodId = location.pathname.split('/')[2];
  const [grid,setGrid] = React.useState(0);
  
  React.useEffect(() => {
    if(screenWidth > 1300) {
        setGrid(4);
    }else if(screenWidth > 762) {
        setGrid(3);
    }else if(screenWidth > 532) {
        setGrid(2);
    }else {
        setGrid(1);
    }
  },[screenWidth])
  React.useEffect(() => {
    if(mainImg) {
        document.querySelectorAll('.other-img').forEach((img) => img.classList.remove('active'))
        document.querySelector(`[data-img="${mainImg}"]`).classList.add('active')
    }
  },[mainImg])
  React.useEffect(() => {
      dispatch(getProduct(prodId));
      dispatch(getAllProducts())
    },[prodId]);
  const singleProdSel = useSelector((state) => state.product.product);
  const cartSel = useSelector ((state) => state.user.cart);
  React.useEffect(() => {
      if(singleProdSel?.images) {
          setMainImg(singleProdSel.images[0].url)
        }
    
    },[singleProdSel])
    React.useEffect(() => {
        if(userSel?.user !== undefined) {
            for(let i=0;i< cartSel?.length;i++) {
                if(cartSel[i].productId._id === prodId) {
                    setIsProductInCart(true);
                }
            }
        }
    },[cartSel]);
    const ratingChanged = (e) => {
        console.log(e)
    }
    const handleAddToCart = () => {
     if(color === '' && size === '') {
        if(color === '') {
            toast.error('You must select color!');
         }else {
            toast.error('You must select size!')
         }
     }else {
        const cartData = {color,quantity,price : singleProdSel?.price,productId : prodId,size}
        alert(JSON.stringify(cartData));
        try {
            dispatch(addToCart(cartData))
            setIsProductInCart(true);
        }catch(err) {
            console.log(err);
        }
            
     }
  }
  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);
}
const allProdSel = useSelector((state) => state.product.products.products);
 React.useEffect(() => {
    if(allProdSel?.length > 0) {
        let data = [];
        for(let i=0;i< allProdSel.length; i++) {
            if(allProdSel[i].tag === 'popular') data.push(allProdSel[i]);
        }
        setPopularProducts(data);
    }
 },[allProdSel])
    
  const handleRating =  async(e) => {
    e.preventDefault();
    if(comment !== '' && star != 0) {
        try {
            await dispatch(rateAProduct({comment,  star,id:prodId})).unwrap();
            await dispatch(getProduct(prodId)).unwrap();
        }catch(err) {
            console.log(err);
        }
    }else if(comment === ''){
        toast.error('pls write comment')
    }else if(star === 0) {
        toast.error('you must give rating')
    }
  }
  console.log(singleProdSel?.totalRating)
  
  return (
    <>
        <BreadCrumb title={singleProdSel?.title}/>
        <Meta title={"Single Product"}/>
        <div className="main-product-wrapper py-5 home-wrapper-2">
            <div className="container-xxl p-3">
                <div className='row '>
                    <div className="col-lg-7 col-md-12 product-container d-flex mt-0 bg-white">
                        <div className="other-product-images d-flex flex-column gap-2">
                            {
                                singleProdSel?.images?.map((image,i) => {
                                   return ( 
                                   <div key={i}
                                   data-img ={image.url}
                                   className=" w-100 other-img d-flex justify-content-center align-items-center" 
                                   style={{width:'100%',padding:'5px',borderRadius:'5px'}}>
                                        
                                        <img 
                                        data-url= {image.url}
                                        src={image.url} 
                                        style={{
                                            objectFit:'contain',
                                            objectPosition:'top left',
                                            height:'70px',
                                            width:'100%',
                                            borderRadius:'5px',
                                            cursor:'pointer'
                                        }} 
                                        onClick={() => {
                                           setMainImg(image.url);     
                                        }}
                                        className="img-fluid" alt={`image+${i}`}/>
                                    </div>)
                                })
                            }
                          
                           
                        </div>
                        <div className="main-product-image  flex-grow-1 my-4" style={{height:'93%'}}>
                            <Magnifier src={mainImg} 
                            mgShape='square'
                            mgShowOverflow={false}
                            mgMouseOffsetX={0}
                            mgMouseOffsetY={0}
                            mgTouchOffsetX={0}
                            mgTouchOffsetY={0}
                            width={500} />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-5 mt-md-4">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">
                                    {singleProdSel?.title}
                                </h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$ {singleProdSel?.price}</p>
                                <div className="d-flex align-items-center gap-1">
                                <Rating
                                        name="read-only"
                                        precision={0.5}
                                        readOnly
                                        value={singleProdSel?.totalRating ? Number(singleProdSel?.totalRating) : 0}
                                     
                                        />
                                <p className="mb-0 t-review">({singleProdSel?.ratings?.length > 0 ? singleProdSel?.ratings?.length > 1 ? `${singleProdSel?.ratings?.length} reviews` : '1 review' : 0 + ' review'} )</p>
                                </div>
                                <a className="review-btn" href="#review">Write a review</a>
                            </div>
                            <div className="border-bottom">
                                <div className="d-flex gap-1 align-items-center">
                                    <h3 className="product-heading my-2">Type: </h3> <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex gap-1 align-items-center">
                                    <h3 className="product-heading my-2">Brand: </h3> <p className="product-data">{singleProdSel?.brand}</p>
                                </div>
                                <div className="d-flex gap-1 align-items-center">
                                    <h3 className="product-heading my-2">Category: </h3> <p className="product-data">{singleProdSel?.category}</p>
                                </div>
                                <div className="d-flex gap-1 align-items-center">
                                    <h3 className="product-heading my-2">Tags: </h3> <p className="product-data">{singleProdSel?.tag}</p>
                                </div>
                                <div className="d-flex gap-1 align-items-center">
                                    <h3 className="product-heading my-2">Availability: </h3> <p className="product-data">In Stock</p>
                                </div>
                                <div className="d-flex gap-1 flex-column mt-2 mb-3">
                                    <h3 className="product-heading my-2">Size: </h3> 
                                    <div className="d-flex flex-wrap gap-1">
                                        {
                                            singleProdSel?.size?.split(",")?.map((value,i) => {
                                                return <span 
                                                key={i}
                                                data-value={value}
                                                style={{cursor:'pointer'}}
                                                onClick={() => {
                                                    document.querySelectorAll('.size').forEach((size) =>  size.classList.remove('active'));
                                                    document.querySelector(`[data-value = ${value}]`).classList.add('active');
                                                    setSize(value);
                                                }}
                                                className="badge size  border border-1 bg-white text-dark">{value}</span>
                                            })
                                        }
                                        
                                        {/* <span className="badge border border-1 bg-white text-dark">M</span>
                                        <span className="badge border border-1 bg-white text-dark">XL</span>
                                        <span className="badge border border-1 bg-white text-dark">XXL</span> */}
                                    </div>
                                </div>
                                <div className="d-flex gap-1 flex-column mt-2 mb-3">
                                    <h3 className="product-heading my-2">Color: </h3> <Color setColor={setColor} colors={singleProdSel?.color}/>
                                </div>
                                <div className="d-flex align-items-center gap-2 flex-row mt-2 mb-3">
                                    <h3 className="product-heading my-2">Quantity: </h3> 
                                    <div className="">
                                        <input 
                                        className="form-control"
                                        type="number" 
                                        name="" 
                                        onChange={(e) => {setQuantity(e.target.value)}}
                                        value={quantity}
                                        style={{"width":"70px"}}
                                        id=""/>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 ms-5">
                                        <button className="button border-0" 
                                        onClick={() => {
                                            if(isProductInCart) {
                                                navigate('/cart');
                                            }else {
                                                if(user !== '') {
                                                    handleAddToCart();
                                                    
                                                }else {
                                                    navigate('/login')
                                                }
                                            }
                                        }}
                                        >
                                            {isProductInCart ? 'Go' : 'Add'} to Cart
                                        </button>
                                        <button 
                                        onClick={() => {
                                            if(isProductInCart) {
                                                navigate('/checkout');
                                            }else {
                                                if(user !== '') {
                                                    handleAddToCart();
                                                    navigate('/checkout')
                                                }else {
                                                    navigate('/login');
                                                }
                                            }
                                           
                                        }}
                                        className="button border-0 signup"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    {/* <div>
                                        <a href="">
                                            <MdOutlineCompare className="fs-5 me-2"/> Add to Compare</a>
                                    </div> */}
                                    <div>
                                        <button 
                                        className="bg-transparent border-0 rounded p-3"
                                        
                                        onClick={() => {
                                            dispatch(addToWishList(prodId));
                                        }} >
                                            <MdFavoriteBorder className="fs-5 me-2"/> Add to Wishlist
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h3 className="product-heading my-3">Shipping & Returns:</h3> 
                                    <p className="product-data">
                                        Free Shipping and returns available on all orders!<br/>
                                        We ship all US domestic orders within 
                                        <b>5-10 business days!</b>
                                    </p>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h3 className="product-heading my-3">Product Link:</h3> 
                                    <a
                                    href="#"
                                    onClick={() => copyToClipBoard(window.location.href)}>
                                        Copy Product Link
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        <section className="description-wrapper  home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className='col-12'>
                        <div className="bg-white p-4">
                             <h3 className="mb-3">Description</h3>
                            <p dangerouslySetInnerHTML={{__html : singleProdSel?.description}}>
                               
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="review" className="review-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                      
                        <div className="review-inner-wrapper">
                        <h3>Reviews</h3>
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                  
                                    <div className="d-flex gap-1 align-items-center">
                                        <Rating
                                        precision={0.5}
                                        readOnly
                                        value={singleProdSel?.totalRating ? Number(singleProdSel?.totalRating) : 0}
                                        name="read-only"
                                        />
                                        <p className="mb-0">Based on {singleProdSel?.ratings?.length > 0 ? singleProdSel?.ratings?.length + `${singleProdSel?.ratings?.length > 1 ? ' reviews' : ' review'}` : 0 + ' review'} </p>
                                    </div>
                                </div>
                                <div>
                                {
                                    showComment=== false
                                    &&
                                    <button 
                                    onClick={() => {
                                        let user = JSON.parse(localStorage.getItem('customer'))?.user;
                                        if(user !== undefined) {
                                            setShowComment((prev) =>  !prev) 
                                        }else {
                                            navigate('/login');
                                        }

                                        }
                                    }
                                    className="text-dark text-decoration-underline bg-transparent border-0">Write A Review</button>
                                }
                                </div>
                            </div>
                           {showComment && <div className="review-form py-4">
                                <form action="" onSubmit={handleRating} className="d-flex gap-2 flex-column">
                                    <h4>Review</h4>
                                    <div className='d-flex align-items-center  gap-2'>
                                            <p className="mb-0">Rate this product:</p>
                                            <Rating
                                                
                                                onChange={(e,newValue) => setStar(newValue)}
                                                precision={0.5}
                                                value={star}
                                                name="simple-controlled"
                                            />
                                    </div>
                                    <div>
                                        <textarea name="comment" id="" cols="30" rows="10" className="w-100 form-control"
                                        placeholder="Enter your comment here..."
                                        onChange={(e) => setComment(e.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="border-0 mt-2 px-4 mx-2" 
                                        style={{borderRadius:'15px'}}
                                        onClick={() => setShowComment((prev) => !prev)}
                                        type="button">Cancel</button>
                                        <button className="button border-0 mt-2" 
                                        // onClick={() => setShowComment(false)}
                                        type='submit'>Submit</button>
                                    </div>
                                </form>
                            </div>}
                            <div className="reviews mt-4">
                               {singleProdSel?.ratings?.map((rating,index) => {
                                return (  <div className="review p-3 m-3" key={index}
                                style={{backgroundColor:'#f5f5f5'}}
                                >
                                <div className="d-flex gap-1 align-items-center">
                                <h4 className="mb-0">{rating.postedBy.firstname} {rating.postedBy.lastname}</h4>
                                <Rating
                                        name="read-only"
                                        value={rating?.star}
                                        precision={0.5}
                                        readOnly
                                />
                                </div>
                                <p className="mt-3">
                                    {rating.comment}
                                </p>
                                
                                </div>)
                               })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="popular-wrapper py-5 home-wrapper-2">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="section-heading">Popular Products</h3>
                            </div>
                            <div 
                            // style={{display:'grid',gridTemplateColumns:`repeat(${grid},1fr);`}}
                            className="d-flex justify-content-equally gap-3  w-100">
                                {
                                    popularProducts?.map((product,i) => {
                                       if(product._id === prodId) {
                                            return;
                                       }
                                       return (
                                        <div key={i} style={{width:'300px'}}>
                                            <ProductCard product={product} w={100}/>
                                        </div>)
                                    })
                                }
                            </div>
                           
                        </div>
                    </div>
        </section>
    </>
  )
}

export default SingleProduct