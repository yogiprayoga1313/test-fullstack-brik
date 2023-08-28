// import { useState } from 'react'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/RoutePrivate'
import Home from './pages/Home'
import DetailProduct from './pages/DetailProduct'
import Register from "./pages/auth/Register"


import { store, persistor } from "./redux/store"
import Login from "./pages/auth/Login"

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/product/:id' element={<PrivateRoute><DetailProduct /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
