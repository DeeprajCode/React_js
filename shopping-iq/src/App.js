import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import User from './Pages/User';
import Products from './Pages/Products';
import ProductView from './Pages/ProductView';
import Cart from './Pages/Cart';
import  Aboutus  from './Pages/Aboutus';


function App() {
  return (
    <Router>
      <ToastContainer position='top-right' />
        <Routes>
           <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path='/user' element={<User/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/Products/:id' element={<ProductView/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/Aboutus' element={<Aboutus/>}/>
        </Routes>
    </Router>
  );
}

export default App;
