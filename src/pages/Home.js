import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Meta from '../components/Meta';
import { services } from '../utils/Data';
import {useSelector,useDispatch} from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';
import { getAllBlogs } from '../features/blog/blogSlice';
import NoDataFound from '../components/NoDataFound';
import BlogCardPlaceholder from '../components/BlogCardPlaceholder';
import ProductPlaceholder from '../components/ProductPlaceholder';
import SpecialProductPlaceholder from '../components/SpecialProductPlaceholder';
import { useStateContext } from '../app/ContextProvider';
import { getAllBanners } from '../features/banner/bannerSlice';
const Home = () => {
  const dispatch = useDispatch();
  const [banners,setBanners] = React.useState([]);
  React.useEffect(() => {
    dispatch(getAllBanners());
  },[])
  const bannerSel = useSelector((state) => state.banner?.banners?.banners);
 
  React.useEffect(() => {
    if(bannerSel) {
      setBanners(bannerSel);
    }
  },[bannerSel])
  React.useEffect(() => {
    const mainBanners = document.querySelectorAll('.main-banner');
    const btns = document.querySelectorAll('.dot');
    console.log(banners);
    if(banners?.length > 0) {
      mainBanners[0].classList.add('active');
    btns[0].classList.add('active');
    const handleClick = (i) => {
      mainBanners.forEach((banner) => {
        banner.classList.remove('active');
      })
      btns.forEach((btn) => {
        btn.classList.remove('active');
      })

      mainBanners[i].classList.add('active');
      btns[i].classList.add('active');
    }
    btns.forEach((btn,i) => {
      btn.addEventListener('click' , () => {
          handleClick(i);
      })
    })
    let i = 0;
    
    const automaticSlide = setInterval(() => {
      
      const active = document.getElementsByClassName('active');
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove('active');
      })
      mainBanners[i].classList.add('active');
      btns[i].classList.add('active');
      i++;
      if(i == mainBanners.length) {
        i = 0;
      }
    },5000);
    return () =>  clearInterval(automaticSlide);
    }
    
  },[banners])
  const {screenWidth} = useStateContext();
  let foundPopular=false,foundSpecial=false,foundFeatured = false;
  const [products,setProducts] = React.useState([]);
  const [blogs,setBlogs] = React.useState([]);
  React.useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBlogs());
  },[])
 
  const prodSel = useSelector ((state) =>  state.product.products.products);
  const blogSel = useSelector ((state) => state.blog.blogs);
  React.useEffect(() => {
    if(prodSel) {
      setProducts(prodSel);
    }
    if(blogSel) {
      setBlogs(blogSel);
    }
  },[prodSel,blogSel]);
  const mainBannerResize = () => {
    const mainBannerContainer = document.querySelector('.main-banner-container');
    
    if(mainBannerContainer) {
      const bannerImg = mainBannerContainer.querySelector('.banner-img');
      const smallBanner = document.querySelectorAll('.small-banner');
      const productImage = document.querySelectorAll('.product-img');
      if(bannerImg) {
        let height = bannerImg.offsetHeight;
        if(height === 0) height= 400;
        console.log(height);
        let smallBannerOffsetHeight = ((height-25)/2);
       
        console.log(smallBannerOffsetHeight)
        productImage.forEach((img) => {
          img.style.height = `${smallBannerOffsetHeight}px`
          // banner.style.marginBottom =  `${margin}px`
        })
        smallBanner.forEach((banner) => {
          banner.style.height = `${smallBannerOffsetHeight}px`
        })
        // productCat.style.height = `${height - 10}px`
        mainBannerContainer.style.height = `${height}px`
      }
    }
  }
  // React.useEffect(() => {
  //   mainBannerResize();
  // },[])
  React.useEffect(() => {
    if(banners) {
      mainBannerResize();

      window.addEventListener('resize',mainBannerResize);
    }
    return () =>  window.removeEventListener('resize',mainBannerResize);
  },[banners])
 
  
  return (
    <>
      <Meta title={"Home Page"} />
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl ">
          <div className="row">
            <div className="col-md-12 col-12 col-lg-6">
              <div className="main-banner-container">
                {
                  banners?.map((banner,i) => {
                    const str = "c_crop,g_custom";
                    const cropUrl = banner.url.replace(/(upload\/)/,"$&"+str+"/");
                    return (<div key={i} className="main-banner" style={{position:'absolute'}}>
                      <img 
                      className=" banner-img rounded-3" 
                      src={cropUrl}
                      alt="banner3"/>
                      <div className="main-banner-content position-absolute" style={{top:'10%',left:'6%'}}>
                        <h4>{banner?.name}</h4>
                        <h5>{banner?.sale_text}</h5>
                        <p>{banner?.price_range}</p>
                        <Link to={`/product/${banner?.productId}`} className="button">Buy Now</Link>
                      </div>
                    </div>)
                  })
                }
                {/* <div className="main-banner " style={{position:'absolute'}}>
                  <img 
                  className=" banner-img rounded-3" 
                  src="https://res.cloudinary.com/dhtjmbn8s/image/upload/w_640,h_420,c_fill,g_north_west,x_0,y_0/v1682753831/pc4xv4d1bvl85t0b5yaj.jpg"
                  alt="banner3"/>
                  <div className="main-banner-content position-absolute" style={{top:'10%',left:'6%'}}>
                    <h4>Supercharged For Pros.</h4>
                    <h5>Special Sale</h5>
                    <p>From $99 or $10/mo.</p>
                    <Link to="/" className="button">Buy Now</Link>
                  </div>
                </div>
                <div className="main-banner" style={{position:'absolute'}}>
                  <img 
                  className=" banner-img rounded-3" 
                  src="https://res.cloudinary.com/dhtjmbn8s/image/upload/w_640,h_420,c_fill,g_north_west,x_0,y_0/v1682753831/qsmjdvbagrvoq4t9i48c.jpg"
                  alt="banner3"/>
                  <div className="main-banner-content position-absolute" style={{top:'10%',left:'6%'}}>
                    <h4>Supercharged For Pros.</h4>
                    <h5>Special Sale</h5>
                    <p>From $99 or $10/mo.</p>
                    <Link to="/" className="button">Buy Now</Link>
                  </div>
                </div> */}
                <div className="btns">
                  {banners?.map((banner,i) => {
                    return  <span key={i} className="dot"></span>
                  })
                  }
                
                </div>
                

              </div>

           
            </div>
            <div className="col-12 col-md-12 col-lg-6 ">
              <div className="d-flex  product-cat justify-content-between gap-2 align-items-top flex-wrap">
              <div className="small-banner position-relative  ">
                <img className="img-fluid product-img rounded-3 w-100 d-flex justify-content-center" src="/images/catbanner-03.jpg" alt="catbanner-02.jpg"/>
                <div className="small-banner-content position-absolute">
                  <h4>New Arrival</h4>
                  <h5>Buy IPad Air</h5>
                  <p>From $599 or <br/> $49.9/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img className="img-fluid product-img rounded-3  w-100 d-flex justify-content-center" src="/images/catbanner-01.jpg" alt="catbanner-01.jpg"/>
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>Laptops  Max</h5>
                  <p>From $1699.00 or <br/>$64.42/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img className="img-fluid product-img rounded-3 w-100 d-flex justify-content-center" src="/images/catbanner-02.jpg" alt="catbanner-01.jpg"/>
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>Laptops  Max</h5>
                  <p>From $1699.00 or <br/>$64.42/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img className="img-fluid product-img rounded-3  w-100 d-flex justify-content-center" src="/images/catbanner-04.jpg" alt="catbanner-01.jpg"/>
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>Laptops  Max</h5>
                  <p>From $1699.00 or <br/>$64.42/mo.</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services flex-sm-column flex-md-row gap-2 d-flex align-items-center justify-content-between flex-wrap mt-3 flex-service-text">
                {
                  services?.map((i,j) => {
                    return (
                      <div
                      key={j} 
                      className="d-flex align-items-center gap-2 mt-3">
                          <img src={i.image} alt='services'/>
                        <div>
                          <h6>{i.title}</h6>
                          <p className="mb-0 service-text">{i.tagline}</p>
                        </div>
                      </div>
                    )

                  })
                }
              
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-3 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex jusitfy-content-between align-items-center">
                <div className="d-flex category-item  align-items-center" >
                  <img className="resize-img" src="images/images/camera.jpg" alt="camera"/>
                  <div>
                    <h6 className="category-name">Cameras</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
                <div className="d-flex category-item align-items-center" >
                  <img className="resize-img" src="images/images/tv.jpg" alt="smart tv"/>
                  <div>
                    <h6 className="category-name">Smart Tv</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
                <div className="d-flex category-item align-items-center" >
                  <img className="resize-img" src="images/images/watch.jpg" alt="watch"/>
                  <div>
                    <h6 className="category-name">Smart Watches</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
                <div className="d-flex category-item align-items-center" >
                  <img className="resize-img" src="images/images/headphone.jpg" alt="music & gaming"/>
                  <div>
                    <h6 className="category-name">Music & Gaming</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
                <div className="d-flex category-item align-items-center" >
                  <img className="resize-img" src="images/images/camera.jpg" alt="camera"/>
                  <div>
                    <h6 className="category-name">Cameras</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
                <div className="d-flex category-item align-items-center" >
                  <img className="resize-img" src="images/images/tv.jpg" alt="smart tv"/>
                  <div>
                    <h6 className="category-name">Smart Tv</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
                <div className="d-flex category-item align-items-center" >
                  <img className="resize-img" src="images/images/watch.jpg" alt="watch"/>
                  <div>
                    <h6 className="category-name">Smart Watches</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
                <div className="d-flex category-item align-items-center" >
                  <img className="resize-img" src="images/images/headphone.jpg" alt="music & gaming"/>
                  <div>
                    <h6 className="category-name">Music & Gaming</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="featured-heading">Featured Collection</h3>
            </div>   
            {  
                  products.length > 0 ?
                  <div className="row">
                    {products?.map((product,i) => {
                      if(product?.tag?.toLowerCase() === 'featured')  {
                        foundFeatured = true;
                        return (
                        <div key={i} className="product-card-container col-xs-6 col-sm-6 col-md-4 col-lg-3 mt-4">
                           <ProductCard key={i} index={i} screenWidth={screenWidth}  product={product} w={100}/>
                        </div>
                      )
                      }
                      })
                    }
                    {
                      foundFeatured ? '' : <NoDataFound/>
                    }
                   </div>
                   :
                   <div className="row">
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                     
                    </div>
            }
          </div>
        </div>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
            {
               products?.length > 0  
               ?
              <div className="row">
              
                {
                  products?.map((product,i) => {
                    if(product.tag.toLowerCase() === 'special') {
                      foundSpecial= true;
                      return (
                        <div key={i} className="mt-2 col-sm-6 col-md-4">
                          <SpecialProduct product={product}/>
                        </div>
                      )
                    }
                  })
                }
                {
                  foundSpecial ? '' : <NoDataFound/>
                }
              
              </div>
              :
              <div className="row">
                <div className="mt-2 col-sm-6 col-md-4">
                  <SpecialProductPlaceholder/>
                </div>
                <div className="mt-2 col-sm-6 col-md-4">
                  <SpecialProductPlaceholder/>
                </div>
                <div className="mt-2 col-sm-6 col-md-4">
                  <SpecialProductPlaceholder/>
                </div>
                <div className="mt-2 col-sm-6 col-md-4">
                  <SpecialProductPlaceholder/>
                </div>

              </div>
            }
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
         
                 {  
                    products.length > 0 ?
                    <div className="row popular-products">
                      {products?.map((product,i) => {
                        if(product.tag.toLowerCase() === 'popular') {
                            foundPopular = true;
                            console.log(product._id)
                            return (
        
                            <div key={i} className="product-card-container col-sm-6 col-md-4 col-lg-3">
                              <ProductCard key={i} index={i} screenWidth={screenWidth} product={product} w={100}/>
                            </div>
                          )

                        }
                        })
                      }
                      {
                        foundPopular ? '' : <NoDataFound/>
                      }
                    </div>
                    :
                    <div className="row">
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                      <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                        <ProductPlaceholder/>
                      </div>
                     
                    </div>
                  }

         </div>
        </div>
      </section>
      <section className="marquee-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee>
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" className="brand-img" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" className="brand-img" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" className="brand-img" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" className="brand-img" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" className="brand-img" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" className="brand-img" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" className="brand-img" alt="brand"/>
                  </div>
                  <div>
                    </div><img src="images/brand-08.png" className="brand-img" alt="brand"/>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">

          <div className='row'>
            <div className="col-12">
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>
                {
                  blogs.length > 0 ?
                  <div className="row">
                      {blogs?.map((blog,i) => {
                        return ( 
                        <div key={i} className="col-sm-6 col-md-4 col-lg-3">
                          <BlogCard blog={blog}/>
                        </div>)
                      })
                    }
                  </div> 
                  :
                  <div className="row">
                  <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                    <BlogCardPlaceholder/>
                  </div>
                  <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                    <BlogCardPlaceholder/>
                  </div>
                  <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                    <BlogCardPlaceholder/>
                  </div>
                  <div className="mt-4 col-sm-6 col-md-4 col-lg-3">
                    <BlogCardPlaceholder/>
                  </div>
                 
                </div>
                }
          </div>
        </div>
      </section>
    </>
  )
}

export default Home