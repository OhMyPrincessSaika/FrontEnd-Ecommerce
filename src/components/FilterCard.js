import React from 'react'

const FilterCard = (props) => {
 
  return (
    <div className="container w-100"
    >
       
        <div className="w-100">
            <h6 style={{fontWeight:'bold',color:'white',textShadow:'1px 1px 2px red'}}>Categories</h6>
            <div className="d-flex flex-wrap align-items-center gap-1">
              {
                props.categories?.map((category) => {
                  return (
                    <p 
                    onClick={() => {
                      props.setCategory(category.category);
                      const filter = document.getElementsByClassName('sm-screen-filter')[0];
                        if(filter.classList.contains('active')) {
                          filter.classList.remove('active');
                        }else {
                          filter.classList.add('active');
                        }
                    }}
                    style={{borderRadius:'25px',cursor:'pointer',backgroundColor:'#f5f5f79f'}}
                    className="border border-0 px-2 ">
                    {category.category}
                    </p>

                  )
                })
              }
            </div>
        </div>
        <div className="w-100">
          <h6 style={{fontWeight:'bold',color:'white',textShadow:'1px 1px 2px red'}}>Product Tags</h6>
          <div className='d-flex align-items-center gap-1 flex-wrap'>
            {
              [...new Set(props.tags)]?.map((tag) => {
                return (
                  <p 
                  onClick={() =>{
                    props.setTag(tag)
                    const filter = document.getElementsByClassName('sm-screen-filter')[0];
                  if(filter.classList.contains('active')) {
                    filter.classList.remove('active');
                  }else {
                    filter.classList.add('active');
                  }
                  }}
                        style={{borderRadius:'25px',cursor:'pointer',backgroundColor:'#f5f5f79f'}}
                        className="border border-0 px-2 ">
                        {tag}
                        </p>

                )
              })
            }
          </div>
        </div>
        <div className="w-100">
            <h6 style={{fontWeight:'bold',color:'white',textShadow:'1px 1px 2px red'}}>Brands</h6>
            <div className="d-flex flex-wrap align-items-center gap-1">
              {
                [...new Set(props?.brands)].map((brand) => {
                  return (
                    <p 
                    onClick={() =>{
                      props.setBrand(brand.brand)
                      const filter = document.getElementsByClassName('sm-screen-filter')[0];
                      if(filter.classList.contains('active')) {
                        filter.classList.remove('active');
                      }else {
                        filter.classList.add('active');
                      }
                    }}
                        style={{borderRadius:'25px',cursor:'pointer',backgroundColor:'#f5f5f79f'}}
                        className="border border-0 px-2 ">
                        {brand?.brand}
                        </p>
                    
                  )
                })
              }
            </div>
        </div>
        <div className="w-100">
            <h6 style={{fontWeight:'bold',color:'white',textShadow:'1px 1px 2px red'}}>Price Range</h6>
            <div className="d-flex align-items-center justify-content-between gap-1 w-100">
              <input type="number" placeholder="from" value={props.minPrice} 
              onChange={(e) => {props.setMinPrice(e.target.value)}} 
              style={{width:'50%',border:'0',borderRadius:'10px',paddingLeft:'5px',height:'28px'}}  />
              <input type="number" placeholder="to" value={props.maxPrice} 
              onChange={(e) => {props.setMaxPrice(e.target.value)}}  
              style={{width:'50%',border:'0',borderRadius:'10px',paddingLeft:'5px',height:'28px'}}/>
            </div>
        </div>
    </div>
  )
}

export default FilterCard