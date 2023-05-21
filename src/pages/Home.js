import React from 'react'
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

const Home = () => {
  let foundPopular=false,foundSpecial=false,foundFeatured = false;
  const [products,setProducts] = React.useState([]);
  const [blogs,setBlogs] = React.useState([]);
  const dispatch = useDispatch();
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
  
  return (
    <>
      <Meta title={"Home Page"} />
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl ">
          <div className="row">
            <div className="col-md-12 col-12 col-lg-6">
            {/* <div className="d-flex jusitfy-content-center align-items-center"> */}
                <div className="main-banner" style={{position:'relative'}}>
                  <img className="img-fluid banner-img rounded-3" src="/images/banner-c1.jpg" alt="banner3"/>
                  <div className="main-banner-content position-absolute" style={{top:'10%',left:'6%'}}>
                    <h4>Supercharged For Pros.</h4>
                    <h5>Special Sale</h5>
                    <p>From $99 or $10/mo.</p>
                    <Link to="/" className="button">Buy Now</Link>
                  </div>
                </div>
            {/* </div> */}
           
            </div>
            <div className="col-12 col-md-12 col-lg-6 ">
              <div className="d-flex flex-wrap product-cat justify-content-between gap-2 align-items-center">
              <div className="small-banner position-relative ">
                <img className="img-fluid product-img rounded-3" src="/images/catbanner-03.jpg" alt="catbanner-02.jpg"/>
                <div className="small-banner-content position-absolute">
                  <h4>New Arrival</h4>
                  <h5>Buy IPad Air</h5>
                  <p>From $599 or <br/> $49.9/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img className="img-fluid product-img rounded-3" src="/images/catbanner-01.jpg" alt="catbanner-01.jpg"/>
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>Laptops  Max</h5>
                  <p>From $1699.00 or <br/>$64.42/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img className="img-fluid product-img rounded-3" src="/images/catbanner-02.jpg" alt="catbanner-01.jpg"/>
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>Laptops  Max</h5>
                  <p>From $1699.00 or <br/>$64.42/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img className="img-fluid product-img rounded-3" src="/images/catbanner-04.jpg" alt="catbanner-01.jpg"/>
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
              <div className="services d-flex align-items-center justify-content-between flex-wrap mt-3 flex-service-text">
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
              <div className="categories d-flex jusitfy-content-between flex-wrap align-items-center">
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Cameras</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/camera.jpg" alt="camera"/>
                </div>
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Smart Tv</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/tv.jpg" alt="smart tv"/>
                </div>
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Smart Watches</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/watch.jpg" alt="watch"/>
                </div>
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Music & Gaming</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/headphone.jpg" alt="music & gaming"/>
                </div>
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Cameras</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/camera.jpg" alt="camera"/>
                </div>
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Smart Tv</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/tv.jpg" alt="smart tv"/>
                </div>
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Smart Watches</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/watch.jpg" alt="watch"/>
                </div>
                <div className="d-flex  align-items-center" >
                  <div>
                    <h6 className="category-name">Music & Gaming</h6>
                    <p className="category-items">10 Items</p>
                  </div>
                  <img className="resize-img" src="images/images/headphone.jpg" alt="music & gaming"/>
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
                        <div key={i} className="col-sm-6 col-md-4 col-lg-3 mt-4">
                           <ProductCard key={i} index={i}  product={product} w={100}/>
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
                    <div className="row">
                      {products?.map((product,i) => {
                        if(product.tag.toLowerCase() === 'popular') {
                            foundPopular = true;
                            return (
        
                            <div key={i} className="col-sm-6 col-md-4 col-lg-3">
                              <ProductCard key={i} index={i}  product={product} w={100}/>
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