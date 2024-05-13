// App.js
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import GoldForm from './pages/GoldForm';
import Home from './pages/Home';
import Edit from './pages/Edit';
import SilverForm from '.pages/SilverForm'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gold" element={<GoldForm />} />
        <Route path="/edit" element={<Edit/>} />
        <Route path="/silver" element={<SilverForm/>} />


      </Routes>
    </Router>
  );
}

export default App;
