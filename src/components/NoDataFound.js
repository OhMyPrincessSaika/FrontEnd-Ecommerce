import React from 'react'
import { Empty } from 'antd';

const NoDataFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100 m-2 bg-white" style={{height:'300px'}}>
      <Empty/>

    </div>
  )
}

export default NoDataFound