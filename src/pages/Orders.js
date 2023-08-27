import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { getMyOrder } from '../features/order/orderSlice';
import BreadCrumb from '../components/BreadCrumb';

const Orders = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getMyOrder());
  },[])
  const orderSel = useSelector((state) => state.order.myOrder);
  const [orders,setOrders] = React.useState([]);
  React.useEffect(() => {
    if(orderSel?.length > 0) {
      setOrders(orderSel);
    }
  },[orderSel]);
  const [screenWidth,setScreenWidth] = React.useState(0);
  
  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    handleResize();
      window.addEventListener('resize',handleResize);

      return () => {
        window.removeEventListener('resize',handleResize)
      }
  },[])
  console.log(orders)
  return (
    <>
      <BreadCrumb title="My Orders"/>
      {
        screenWidth > 920 
        ?
        <div className="container-xxl">
          <div className="row" style={{overflow:'scroll'}}>
            <div className="col-12">
              <div className="row text-white pt-2 " style={{backgroundColor:'#131921'}}>
                <div className="col-3">
                  <h5>
                    OrderId
                  </h5>
                </div>
                <div className="col-3">
                  <h5>
                    Total Amount 
                  </h5>
                </div>
                <div className='col-3'>
                  <h5>
                    Total After Discount
                  </h5>
                </div>
                <div className="col-3">
                  <h5>
                    Status
                  </h5>
                </div>
              </div>
            <div className='col-12 mt-3'>
              {
                orders?.map((order,i) => {
                  return (<div key={i} className='row mt-3 mb-3 pt-3' style={{backgroundColor:'#febd69'}}>
                  <div className="col-3">
                      <p>
                        {order._id}
                      </p>
                  </div>
                  <div className="col-3">
                      <p>
                        $ {order.totalPrice} 
                      </p>
                  </div>
                  <div className='col-3'>
                      <p>
                        $ {order.totalPriceAfterDiscount}
                      </p>
                  </div>
                  <div className="col-3">
                      <p>
                        {order.orderStatus}
                      </p>
                  </div>
                  <div className="col-12">
                    <div className='row p-3' style={{backgroundColor:'#f5f5f7'}}>
                    <div className="col-3">
                      <p>
                        Product Name
                      </p>
                  </div>
                  <div className="col-3">
                      <p>
                        Quantity 
                      </p>
                  </div>
                  <div className='col-3'>
                      <p>
                        Price
                      </p>
                  </div>
                  <div className="col-3">
                      <p>
                        Color
                      </p>
                  </div>
                  <div className="col-12">
                    {
                      order?.orderItems?.map((data,i) => {
                        return (
                          <div className="row" key={i}>
                          <div className="col-3">
                            <p>
                              {data?.product?.title}
                            </p>
                        </div>
                        <div className="col-3">
                            <p>
                              {data?.quantity} 
                            </p>
                        </div>
                        <div className='col-3'>
                            <p>
                              $ {data?.price}
                            </p>
                        </div>
                        <div className="col-3">
                            <p style={{backgroundColor:data.color,border:'1px solid white',width:'20px',height:'20px',borderRadius:'50%'}}>
                            
                            </p>
                        </div>
                          </div>
                        )
                      })
                    }
                  
                  </div>
                    </div>
                  </div>
                </div>)
                })
              }
            
              
          
            </div>
            </div>
          
          
          </div>
        </div>
        :
        <div className="d-flex flex-wrap justify-content-center align-items-top ">
          {orders?.map((order) => {
            return (
              <div className="p-3 flex-grow-1 gap-3">
                <div className="d-flex flex-column align-items-left mt-5 p-3" style={{backgroundColor:'#f5f5f7'}} >
                  <p>OrderId : <span style={{fontWeight:'bold'}}>{order._id}</span> </p>
                  <p>TotalPrice : <span style={{fontWeight:'bold'}}>$ {order.totalPrice}</span></p>
                  <p>TotalPriceAfterDiscount : <span style={{fontWeight:'bold'}}>$ {order.totalPriceAfterDiscount}</span></p>
                  <p>Order Status : <span style={{fontWeight:'bold'}}>{order.orderStatus}</span></p>
                  <div className="d-flex flex-column">
                    <p style={{borderBottom:'1px solid white'}}>Order Items : <span>{order.orderItems?.length} item(s)</span></p>
                    <ul>
                      {
                        order.orderItems?.map((productData) => {
                          return (
                            <li>
                              <p>Product Name : <span style={{fontWeight:'bold'}} >{productData?.product?.title}</span></p>
                              <p>Quantity : <span style={{fontWeight:'bold'}}>{productData?.quantity}</span></p>
                              <p>Price : <span style={{fontWeight:'bold'}}>$ {productData?.price} </span></p>
                              <div className="d-flex align-items-center">
                                <p className='me-2'>Color :</p> 
                                <p style={{backgroundColor:productData?.color,width:'20px',height:'20px',borderRadius:'50%'}}></p></div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            )
          }) 
          }
        </div>
      }
    </>
  )
}

export default Orders