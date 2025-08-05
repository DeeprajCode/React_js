import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';

// Route Component
import AppRoutes from './Routes/AppRoutes';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Router>
      <ToastContainer position="top-right" />

      <div className="flex min-h-screen">
        {showSidebar && <Sidebar />}

        <div className="flex-1">
          <Header sidebar={() => setShowSidebar(!showSidebar)} />

          <main className="p-4">
            <AppRoutes />
          </main>

        </div>
        
      </div>
    </Router>
  );
};

export default App;
