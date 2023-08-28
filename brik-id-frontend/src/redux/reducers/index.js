import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import authReducer from './auth'

const authConfig = {
    key:'auth',
    storage
}

const reducer = combineReducers ({
    auth: persistReducer(authConfig, authReducer)
})


export default reducer 