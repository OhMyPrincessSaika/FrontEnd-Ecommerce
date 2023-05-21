import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex align-items-center text-warning justify-content-center fs-4" style={{height:'400px'}}>
       
            <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
        
    </div>
  )
}

export default Loading