import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App.jsx';
import { CartMaker } from './context/CartContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartMaker>
    <App />
  </CartMaker>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
