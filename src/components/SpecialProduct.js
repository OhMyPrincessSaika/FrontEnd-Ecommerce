import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import SpecialProductPlaceholder from './SpecialProductPlaceholder';

const SpecialProduct = (props) => {
  const [isLoaded,setIsLoaded] = React.useState(false);  
  const {product : {images,title,brand,price,quantity,totalRating,description,sold}} = props;

  const ratingChanged = (e) => {
    console.log(e);
  }
  const handleLoaded = () => {
    setIsLoaded(true);
  }
  return (
    <>
      {!isLoaded && <SpecialProductPlaceholder/>}
      <div className=" my-2" style={{display : isLoaded ? 'block' : 'none'}}>
          <div className="special-product-card">
              <div className="d-flex gap-4 justify-content-between">
                <div>
                  <img onLoad={handleLoaded} src={images[0].url} alt="watch" className="img-fluid" style={{borderRadius:'10px'}}/>
                </div>
                <div>
                  <div className="special-product-content">
                    <h5 className="brand fs-6">
                      {title}
                    </h5>
                    <h5 style={{fontSize:'12px'}} className="brand text-warning">
                      {brand}
                    </h5>
                    <h6 className="title text-secondary" style={{fontSize:'13px'}} dangerouslySetInnerHTML={{__html : description}}>
                      
                    </h6>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      value={totalRating}
                      edit={false}
                      activeColor="#ffd700"
                  />
                  <p className="price">
                    <span className="red-p text-danger">$ {price}</span>
                    &nbsp;
                    {/* <strike>$799</strike> */}
                  </p>
                  <div className="discount-till d-flex align-items-center gap-1">
                    <p className="mb-0"><b>5</b>days</p>
                    <div className="d-flex gap-1">
                      <span className="badge bg-danger rounded-circle p-2">05</span>:
                      <span className="badge bg-danger rounded-circle p-2">10</span>:
                      <span className="badge bg-danger rounded-circle p-2">33</span>
                    </div>
                  </div>
                  <div className='prod-count my-3'>
                    <p>Count:<span>{quantity}</span></p>
                    <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width:quantity / quantity +sold * 100 + "%"}} 
                    aria-valuenow={quantity / quantity +  sold * 100} 
                    aria-valuemin={quantity} 
                    aria-valuemax={quantity+ sold}></div>

                    </div>
                  </div>
                  <Link to="/" className="button">Add To Cart</Link>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default SpecialProduct