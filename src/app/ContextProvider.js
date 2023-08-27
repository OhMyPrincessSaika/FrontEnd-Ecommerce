import React from 'react'

const StateContext = React.createContext();
export const ContextProvider = ({children}) => {
  const [totalCartAmount,setTotalCartAmount] = React.useState(0);
  const [totalQuantityOfCart,setTotalQuantityOfCart] = React.useState(0);
  const [login,setLogin] = React.useState(false);

  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
  const [user,setUser] = React.useState(getTokenFromLocalStorage!== undefined ? getTokenFromLocalStorage : '');
  const [screenWidth,setScreenWidth] = React.useState(0);
  React.useEffect(() => {
   const handleScreenWidth = () => {
     setScreenWidth(window.innerWidth);
   }
   handleScreenWidth();
   window.addEventListener('resize', handleScreenWidth);
   return () => window.removeEventListener('resize',handleScreenWidth);
 },[])
 
  return (
     <StateContext.Provider value={{screenWidth,totalCartAmount,user,setUser,login,setLogin,setTotalCartAmount,totalQuantityOfCart,setTotalQuantityOfCart}}>
        {children}
     </StateContext.Provider>
  )
}

export const useStateContext = () => React.useContext(StateContext);