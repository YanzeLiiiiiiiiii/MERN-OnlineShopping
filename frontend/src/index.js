import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';


import { Home } from './screeens/Home';
import ProductDetail from './screeens/ProductDetail'
import Cart from './screeens/Cart.jsx'
import Login from './screeens/Login.jsx'
import Register from './screeens/Register.jsx'
import Shipping from './screeens/Shipping.jsx'
import Payment from './screeens/Payment.jsx'
import PlaceOrder from './screeens/PlaceOrder.jsx'
import PrivateAccess from './components/PrivateAccess.jsx'

// axios.defaults.baseURL = 'http://localhost:3000/api';



const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='' element={<PrivateAccess />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
      </Route>

    </Route>
  )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
