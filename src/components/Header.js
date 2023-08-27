import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {BsSearch,BsPersonFill} from 'react-icons/bs';
import {BsSuitHeartFill} from 'react-icons/bs';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BiCategoryAlt} from 'react-icons/bi';
import { useStateContext } from '../app/ContextProvider';
import { useDispatch,useSelector}  from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import { getUserCart,getUser } from '../features/user/userSlice';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
  const [opt,setOpt] = React.useState([]);
  const [paginate, setPaginate] = React.useState(true);
  const userSel = useSelector((state) => state.auth.loginUser);
  const registerSel = useSelector((state) => state.auth.registerUser);
  const [isLogin,setIsLogin] = React.useState(false);
  const prodSel = useSelector((state) => state.product?.products?.products);
  
  React.useEffect(() => {
      if(userFromLocalStorage?.token) {
        setIsLogin(true);
      }
  },[userSel,registerSel])
  React.useEffect(() => {
    if(isLogin) {
      dispatch(getUser());
    }
  },[])
  React.useEffect(() => {
    let data = [];
    for(let i=0; i< prodSel?.length; i++) {
       const element = prodSel[i];
       data.push({id:i,prod:element?._id,name:element?.title})
    }
    setOpt(data);

  },[prodSel]);
 
  const createdCartSel = useSelector((state) => state.user.createdCart);
  const {totalCartAmount,totalQuantityOfCart,setTotalQuantityOfCart,setTotalCartAmount} = useStateContext();
  React.useEffect(() => {
    dispatch(getUserCart());
  },[createdCartSel]);
  const cartSel = useSelector((state) => state.user.cart);
  console.log(cartSel);
  React.useEffect(() => {
    console.log('run')
    if(isLogin) {
      const sum = cartSel?.reduce((prev,currentValue) => {
       return prev+(currentValue.price*currentValue.quantity)
      },0)
      setTotalQuantityOfCart(cartSel?.length > 0 ? cartSel?.length : 0);
      setTotalCartAmount(sum);

    }
  },[cartSel,isLogin]);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/',{replace:true});
    window.location.reload();
  }
  return (
     <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0 shipping">Free Shipping Over $100 & Free Returns</p>
            </div>
            <div className="col-6 ">
              <p className="text-end text-white mb-0 shipping-hotline">Hotline :<a className="text-white hotline" href="tel:+95 781252825">+95781252825</a></p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
        <div className="d-flex top-header  gap-2 justify-content-between flex-wrap align-items-center">
          <div className="flex-grow-1">
            <h2>
              <Link className="text-white">Saika Store</Link>
            </h2>
          </div>
          <div className="flex-grow-3">
         

          </div>
          <div className="">
            <div className="header-upper-links d-flex  align-items-center justify-content-end gap-4">
            <div className="input-group">
          <Typeahead
            id="pagination-example"
            onPaginate={() => console.log('Results paginated')}
            options={opt}
            minLength={2}
            popperProps={{
              modifiers: {
                preventOverflow: { padding: 5 },
                flip: { padding: 5 },
                offset: { offset: [0, 10] },
              },
            }}
            onChange={(selected) => {
              navigate(`/product/${selected[0]?.prod}`)
            }}
            labelKey="name"
            paginate={paginate}
            placeholder="Search Products..."
            />
            <span className="input-group-text p-3" id="basic-addon2">
              <BsSearch className="fs-5"/>
            </span>
          </div>
              <div className="nav-links">
                <Link to="/wish-list" className="text-white d-flex gap-2 align-items-center justify-content-center">
                  <BsSuitHeartFill className="fs-3 fs"/>
                  <p className="link-text mb-0 fs">Favorite<br/>WishList</p>
                </Link>
              </div>
              <div className='nav-links'>
                <Link to={isLogin ? '' : '/login'} className="text-white d-flex gap-2 align-items-center justify-content-center">
                  <BsPersonFill className="fs-3 fs"/>
                  {
                    isLogin ?
                    <p className="link-text mb-0 fs">
                      Welcome<br/>{userFromLocalStorage.user.firstname}
                    </p>
                    :
                    <p className="link-text mb-0 fs">
                      Log In<br/>Account
                    </p>

                  }
                </Link>
              </div>
              <div className="nav-links">
                <Link to="/cart" className="text-white d-flex gap-1 align-items-center justify-content-center">
                  <AiOutlineShoppingCart className="fs-3 fs"/>
                  <div className="link-text d-flex gap-1 flex-column justify-content-center fs">
                    <span className="bg-white badge rounded-3 text-dark fs">{totalQuantityOfCart}</span>
                    <p className="mb-0 fs">$ {totalCartAmount}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div> 
        </div>
      </header>
      <header className="header-lower py-3">
        <header className="container-xxl">
           <div className="row">
            <div className="col-12">
              <div className="menu d-flex align-items-center gap-5 justify-content-start">
                <div className="dropdown" style={{cursor:'pointer'}}>
                  <button className="dropdown-toggle btn btn-secondary btn-sm bg-transparent border-0 border gap-3 mb-0 text-white dropdown-toggle-no-caret d-flex align-items-center" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <BiCategoryAlt className="fs-4"/>
                    <h5 className="mb-0" >Shop Categories</h5>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link className="dropdown-item" to="/">Action</Link></li>
                  <li><Link className="dropdown-item" to="/">Another action</Link></li>
                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                  </ul>
                </div>
                <div className="hamburger" 
                style={{cursor:'pointer'}}
                onClick={() => {
                  
                  const menuLinks = document.getElementsByClassName('menu-links')[0];
                  if(menuLinks.classList.contains('active')) {
                    menuLinks.classList.remove('active');
                  }else {
                    menuLinks.classList.add('active')
                  }
                }}
                >
                  <GiHamburgerMenu className="text-white fs-3"/>
                </div>
                <div className="menu-links d-flex justify-content-end  mb-0  w-100">
                  <div className="d-flex main-menu gap-3 align-items-center ">
                    <NavLink className="flex-grow-1" to="/">Home</NavLink>
                    <NavLink className="flex-grow-1" to="/products">Our Store</NavLink>
                    <NavLink className="flex-grow-1"to='/orders'>My Orders</NavLink>
                    <NavLink className="flex-grow-1" to="/blogs">Blogs</NavLink>
                    <NavLink className="flex-grow-1" to="/contact">Contact</NavLink>
                  <button 
                    className=" bg-transparent  border-0   text-white" 
                    type="button"
                    onClick={handleLogout}
                    >LOG OUT</button>
                  </div>
                </div>
              </div>
            </div>
           </div>
        </header>
      </header>
     </>
  )
}

export default Header