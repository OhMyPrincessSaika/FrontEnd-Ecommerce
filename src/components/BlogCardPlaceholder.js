import React from 'react'

const BlogCardPlaceholder = () => {
  return (
    <div className='blog-placeholder' style={{width:'100%',height:'100%',backgroundColor:'white',padding:'15px'}}>
        <div style={{width:'100%',height:'361',aspectRatio:'280/361',backgroundColor:'#ddd'}}></div>
        <div className="mt-3" style={{width:'40%',height:'20px',backgroundColor:'#ddd'}}></div>
        <div className="mt-2" style={{width: '100%',height:'35px',backgroundColor : '#ddd'}}></div>
        <div className="mt-2" style={{width: '100%',height: '60px',backgroundColor : '#ddd'}}></div>
        <div className="mt-4" style={{width: '30%',height:'40px',backgroundColor:'#ddd',borderRadius:'15px'}}></div>

    </div>
  )
}

export default BlogCardPlaceholder