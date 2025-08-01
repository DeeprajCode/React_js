import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';

// Pages
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import User from './Pages/User/User';
import Products from './Pages/Products/Products';
import ProductView from './Pages/Products/ProductView';
import Cart from './Pages/Cart/Cart';
import Aboutus from '../src/Pages/Aboutus/Aboutus'
import Billing from './Pages/Billing';
import Contact from './Pages/Contact/Contact';
import Payment from './Pages/Payment/Payment';
import Credit from './Pages/Payment/Credit';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Router>
      <ToastContainer position="top-right" />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {showSidebar && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1">
          <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />

          <main className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/User" element={<User />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Products/:id" element={<ProductView />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Aboutus" element={<Aboutus />} />
              <Route path='/Billing' element={<Billing/>}/>
              <Route path='/Contact' element={<Contact/>}/>
              <Route path='/Payment' element={<Payment/>}/>
              <Route path='/Credit' element={<Credit/>}/>
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
