import React from 'react'

const StateContext = React.createContext();
export const ContextProvider = ({children}) => {
  const [totalCartAmount,setTotalCartAmount] = React.useState(0);
  const [totalQuantityOfCart,setTotalQuantityOfCart] = React.useState(0);
  const [login,setLogin] = React.useState(false);
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
  const [user,setUser] = React.useState(getTokenFromLocalStorage!== undefined ? getTokenFromLocalStorage : '');
  return (
     <StateContext.Provider value={{totalCartAmount,user,setUser,login,setLogin,setTotalCartAmount,totalQuantityOfCart,setTotalQuantityOfCart}}>
        {children}
     </StateContext.Provider>
  )
}

export const useStateContext = () => React.useContext(StateContext);