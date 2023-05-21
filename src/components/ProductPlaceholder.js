import React from 'react'
import ReactStars from "react-rating-stars-component";
import {AiOutlineHeart} from 'react-icons/ai';

const ProductPlaceholder = () => {
  return (
    <div className="product-placeholder" style={{width: '100%',height: 406 ,backgroundColor:'white',padding:'20px',position:'relative'}}>
        <div style={{backgroundColor :'#ddd',width: '100%',height:'240px',aspectRatio:'7/8'}}>
        </div>
        <div className="mt-2 d-flex align-items-center justify-content-between">
            <div style={{flexGrow: 1,width:'100%',height:'20px',backgroundColor:'#ddd'}}></div>
            <AiOutlineHeart className="fs-5"/>
        </div>
        <div className="mt-2" style={{width:'40%',height:'12px',backgroundColor:'#ddd'}}>
        </div>
        <ReactStars
        className="mb-2"
        count={5}
        onChange={() => {}}
        size={24}
        value={0}
        edit={false}
        activeColor="#ffd700"
        />
        <div className="mt-4" style={{width:'40%',height:'15px',backgroundColor:'#ddd'}}></div>
        
    </div>
  )
}

export default ProductPlaceholder