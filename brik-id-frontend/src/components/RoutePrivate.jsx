import propTypes from 'prop-types'
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setWarningMessage } from '../redux/reducers/auth';

const PrivateRoute = ({children}) => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    React.useEffect(() =>{
        if(!token)
        dispatch(setWarningMessage('You have to login first!'))
    })
    if(token) {
        return children
    }else{
        
        return <Navigate to="/login"/>
    }
}

PrivateRoute.propTypes = {
    children: propTypes.element
}

export default PrivateRoute