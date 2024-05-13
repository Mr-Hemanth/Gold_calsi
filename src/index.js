import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import GoldForm from './pages/GoldForm';
import SilverForm from './pages/SilverForm'; // Corrected import statement

import { GlobalProvider } from './pages/GlobalContext'; // Import GlobalProvider

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider> {/* Wrap your entire application with GlobalProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/gold" element={<GoldForm />} />
          <Route path="/silver" element={<SilverForm />} />
        </Routes>
      </Router>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
