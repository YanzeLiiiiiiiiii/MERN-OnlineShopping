import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals'

import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import axios from 'axios'
import { Home } from './screeens/Home';
import ProductDetail from './screeens/ProductDetail'
axios.defaults.baseURL = 'http://localhost:3000/api';



const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/product/:id' element={<ProductDetail />} />
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
