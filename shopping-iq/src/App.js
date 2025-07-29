import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

// Pages
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import User from './Pages/User';
import Products from './Pages/Products';
import ProductView from './Pages/ProductView';
import Cart from './Pages/Cart';
import Aboutus from './Pages/Aboutus';
import Billing from './Pages/Billing';
import Contact from './Pages/Contact';

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
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/User" element={<User />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Products/:id" element={<ProductView />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Aboutus" element={<Aboutus />} />
              <Route path='/Billing' element={<Billing/>}/>
              <Route path='/Contact' element={<Contact/>}/>
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
