import React from 'react'
import ReactStars from "react-rating-stars-component";

const SpecialProductPlaceholder = () => {
  return (
    <div className="special-placeholder " style={{borderRadius:'10px',width:'100%',height:'100%',padding:'20px',backgroundColor:'white',display:'flex',gap:'10px',justifyContent:'between',alignItems:'start'}}>
        <div style={{width:'100%',flexGrow:'1',height:'180px',backgroundColor:'#ddd'}}>

        </div>
        <div style={{width:'100%',height:'100%'}}>
            <div style={{width:'70%',height:'20px',backgroundColor:'#ddd'}}></div>
            <div className="mt-2" style={{width:'100%',height:'60px',backgroundColor:'#ddd'}}></div>
            <div className="mt-2">

                <ReactStars
                        className="mb-2"
                        count={5}
                        size={24}
                        value={0}
                        edit={false}
                        activeColor="#ffd700"
                    />
            </div>
            <div className="mt-1" style={{width:'60%',height:'20px',backgroundColor:'#ddd'}}></div>
            <div className="mt-4" style={{width:'100%',height:'20px',backgroundColor:'#ddd'}}></div>
            <div className="mt-3" style={{width:'40%',height:'20px',backgroundColor:'#ddd'}}></div>
            <div className="mt-3" style={{width:'100%',height:'20px',backgroundColor:'#ddd'}}></div>
            <div className="mt-3" style={{width:'80%',height:'40px',backgroundColor:'#ddd',borderRadius:'10px'}}></div>
        </div>
    </div>
  )
}

export default SpecialProductPlaceholder