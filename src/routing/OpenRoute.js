import { Navigate } from "react-router-dom";
import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
export const OpenRoute = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
    return getTokenFromLocalStorage?.token === undefined ? children : <Navigate to="/" replace={true} />
}