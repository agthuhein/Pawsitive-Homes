import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
