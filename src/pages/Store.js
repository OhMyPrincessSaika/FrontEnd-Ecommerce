import React from 'react'
import ProductCard from '../components/ProductCard'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import {RxCross2} from 'react-icons/rx';
import Color from '../components/Color';
import {useSelector,useDispatch} from 'react-redux';
import NoDataFound from '../components/NoDataFound';
import {GiHamburgerMenu} from 'react-icons/gi';
import {getAllBrands, getAllCategories, getAllTags,getAllProducts} from '../features/products/productSlice'
import FilterCard from '../components/FilterCard';
const Store = () => {
  const dispatch = useDispatch();
  const [categories,setCategories] = React.useState([]);
  const [brands,setBrands] = React.useState([]);
  const [tags,setTags] = React.useState([]);
  

  //filter state 
  const [category,setCategory] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [tag,setTag] = React.useState('');
  const [minPrice,setMinPrice] = React.useState(0);
  const [maxPrice,setMaxPrice] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [sort,setSort] = React.useState();
  const [showFilter,setShowFilter] = React.useState(false);
  const [screenWidth,setScreenWidth] = React.useState(0);
  console.log(screenWidth)
  React.useEffect(() => {
    const handleScreenResize = () => {
      setScreenWidth(window.innerWidth);
    }
    handleScreenResize();
    window.addEventListener('resize',handleScreenResize);
    return () => window.removeEventListener('resize',handleScreenResize)
  },[])
  React.useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllTags())
    dispatch(getAllCategories())
    dispatch(getAllBrands())
  },[])
  const prodSel = useSelector((state) => state.product?.products?.products);
  const brandSel = useSelector((state) => state.product.brands?.brands);
  const tagSel = useSelector((state) => state.product?.tags);
  const categorySel = useSelector((state) => state.product?.categories?.categories);
  
  React.useEffect(() => {
    if(categorySel)  setCategories(categorySel);
    if(tagSel) setTags(tagSel);
    if(brandSel) setBrands(brandSel);

  },[brandSel,tagSel,categorySel])
  React.useEffect(() => {
    if(prodSel) {
      setProducts(prodSel);
    }
  },[prodSel])
  
  const [grid,setGrid] = React.useState(4);
  React.useEffect(() => {
     if(screenWidth > 1300) {
      setGrid(4)
     }else if(screenWidth > 762) {
      setGrid(3);
     }else if(screenWidth > 532) {
      setGrid(2)
     }else {
      setGrid(1)
     }
  },[screenWidth]);
  const getProducts = async() => {
    try {
      await dispatch(getAllProducts({brand,category,sort,minPrice,maxPrice,tag})).unwrap();

    }catch(err) {
      setProducts([])
    }
  }
  React.useEffect(() => {
    getProducts();
  },[brand,category,sort,minPrice,maxPrice,tag])
  return (
    <div>
        <Meta title="Our store"/>
        <BreadCrumb title="Our Store"/>
        <div className="store-wrapper home-wrapper-2 py-5">
          {
            screenWidth < 1300 &&
            <button type='button' className="bg-white border-0 p-2 mx-2 my-2" onClick={() => {
            const filter = document.getElementsByClassName('sm-screen-filter')[0];
            if(filter.classList.contains('active')) {
              filter.classList.remove('active');
            }else {
              filter.classList.add('active');
            }
          }}>
            <GiHamburgerMenu className="fs-4"/>
          </button>
          }
          <div className='container-xxl'>
            <div className="row position-relative">
              {
                screenWidth > 1300
                ?
                <div className="col-3">
                {
                  
                }
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Shop By Categories</h3>
                  <div>
                    <ul className='ps-0'>
                    {/* console.log(...new Set(categories),...new Set(brands),... new Set(tags)); */}
                      {
                        categories && [...new Set(categories)]?.map((item,i) => {
                           return (<li key={i} onClick={() => setCategory(item.category)}>
                             {item.category}
                           </li>)
                        })
                      }
                    </ul>
                  </div>
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Filter By</h3>
                  {/* <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="in-stock"/>
                      <label className="form-check-label" htmlFor="in-stock">
                        In Stock(1)
                      </label>
                    </div>
                    <div>
                      <input className="form-check-input" type="checkbox" value="" id="out-of-stock"/>
                      <label className="form-check-label" htmlFor="out-of-stock">
                        Out of Stock(0)
                      </label>
                    </div>
                  </div> */}
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-1">
                    <div className="form-floating mb-3">
                      <input type="number" 
                      className="form-control" 
                      id="floatingInput" 
                      value={minPrice}
                      onChange={(e) => {setMinPrice(e.target.value)} }
                      placeholder="Min Price"/>
                      <label htmlFor="floatingInput">Min Price</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input 
                      type="number" 
                      value={maxPrice}
                      onChange={(e) => { setMaxPrice(e.target.value)}}
                      className="form-control"  
                      id="floatingInput1" 
                      placeholder="Max Price"/>
                      <label htmlFor="floatingInput1">Max Price</label>
                    </div>

                  </div>
                  <h5 className="sub-title">Colors</h5>
                    <div>
                      <Color/>
                    </div>
                  {/* <h5 className="sub-title mt-3">Size</h5>
                  <div>
                    <div className='form-check'>
                      <input className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                         S (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                         M (2)
                      </label>
                    </div>
                  </div> */}

                  
                
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Product Tags</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-1">
                      {
                        tags && [...new Set(tags)]?.map((item,i) => {
                          return (<span 
                          key={i}
                          onClick={() => setTag(item)}
                          style={{cursor:'pointer'}}
                          className="badge bg-light text-secondary rounded-3 py-2 px-3">
                          {item}
                        </span>)
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Brands</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-2">
                      {
                        brands && [...new Set(brands)]?.map((item,i) => {
                          return (<span 
                          style={{cursor:'pointer'}}
                          key={i}
                          onClick={() => setBrand(item.brand)}
                          className="badge bg-light text-secondary rounded-3 py-2 px-3">
                          {item.brand}
                        </span>)
                        })
                      }
                    </div>
                  </div>
                </div>
                
                </div>
                : 
                ""
               
              }
              
                
                 <div className="w-75 py-5 px-1 position-absolute sm-screen-filter"
                 style={{
                 zIndex:'5',
                 borderRadius:'2px',
                 background:'linear-gradient(90deg,rgba(0,0,0,0.3),rgba(0,0,0,0.5))',
                 backdropFilter:'blur(2px)'
                 }}
             
                 >
                   <FilterCard brands={brands} tags={tags} categories={categories} setBrand={setBrand} setTag={setTag} setMinPrice={setMinPrice} minPrice={minPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} setCategory={setCategory}/>
                 </div>
                 
              
              <div className="col-lg-9 col-md-12">
                <div className="filter-sort-grid mb-4">
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className="d-flex align-items-center gap-1">
                      <p className="mb-0" style={{width: '100px'}}>Sort By:</p>
                      <select
                        name=""
                        onChange={(e) => {setSort(e.target.value)}}
                        className="form-control form-select" id="" value={sort}>
                        
                          <option value="title">Alphabetically, A-Z</option>
                          <option value="-title">Alphabetically, Z-A</option>
                          <option value="price">Price, low to high</option>
                          <option value="-price">Price, high to low</option>
                          <option value="createdAt">Date, old to new</option>
                          <option value="-createdAt">Date, new to old</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <p className="totalproducts mb-0">{products.length <= 1 ? `${products.length} Product` : `${products.length} Products`} </p>
                          <div className='d-flex align-items-center gap-1 grid'>
                           {
                            screenWidth > 1300 
                            ?
                            <img src="images/images/gr4.svg"
                            className="img-fluid d-block"
                             alt="grid"
                             onClick={() => {
                               setGrid(4)
                             }}/>
                             :
                             ''
                           }
                           {
                             screenWidth > 762 
                             ?
                             <img src="images/images/gr3.svg"
                              className="img-fluid d-block"
                               alt="grid"
                               onClick={() => {
                                 setGrid(3)
                               }}/>
                             :
                             ''
                           }
                           {
                            screenWidth > 532
                            ?
                            <img src="images/images/gr2.svg"
                            className="img-fluid d-block"
                             alt="grid"
                             onClick={() => {
                              setGrid(2)
                             }}/>
                            :
                            ''
                           }
                           {
                            screenWidth > 532
                            ?
                            <img src="images/images/gr.svg"
                             className="img-fluid d-block"
                              alt="grid"
                              onClick={() => {
                                setGrid(1)
                              }}/>
                            :
                            ''
                           }
                          </div>
                      
                       
                          
                         
                      
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start flex-wrap">
                    {tag!= '' && <div className="tag">{tag}<RxCross2 onClick={() => {setTag('')}}/></div>}
                    {brand!= '' && <div className="tag">{brand}<RxCross2 onClick={() => {setBrand('')}}/></div>}
                    {category!= '' && <div className="tag">{category}<RxCross2 onClick={() => {setCategory('')}}/></div>}
                    
                  </div>
                  <div className="products-list pb-5">
                    <div style={{display:'grid',gridTemplateColumns:`${products.length > 0 ? `repeat(${grid},1fr)` : `1fr` }`}}
                    className={`${products.length > 0 ? '' : 'me-3'}`}>
                      {
                        products.length > 0 
                        ?
                        products?.map((product) => {
                          return (
                          <div>
                            <ProductCard grid={grid} screenWidth={screenWidth} product={product} isStore={true} />
                          </div>) 
                        })
                        :
                        <div className="w-100">
                          <NoDataFound/>
                        </div>
                      }
                    
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Store