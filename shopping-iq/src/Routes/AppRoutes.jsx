import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Dashboard from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import User from '../Pages/User/User';
import Products from '../Pages/Products/Products';
import ProductView from '../Pages/Products/ProductView';
import Cart from '../Pages/Cart/Cart';
import Aboutus from '../Pages/Aboutus/Aboutus';
import Billing from '../Pages/Billing';
import Contact from '../Pages/Contact/Contact';
import Payment from '../Pages/Payment/Payment';
import Credit from '../Pages/Payment/Credit';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/User" element={<User />} />

      {/* Product & Cart Routes */}
      <Route path="/Products" element={<Products />} />
      <Route path="/Products/:id" element={<ProductView />} />
      <Route path="/Cart" element={<Cart />} />

      {/* Info & Checkout Routes */}
      <Route path="/Aboutus" element={<Aboutus />} />
      <Route path="/Billing" element={<Billing />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/Credit" element={<Credit />} />
    </Routes>
  );
};

export default AppRoutes;
