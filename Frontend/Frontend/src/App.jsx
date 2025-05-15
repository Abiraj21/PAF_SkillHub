import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import Techniques from './pages/Techniques';
import MealPlan from './pages/MealPlan';

function App() {

  return (
    <>
        {/* Optionally add <Navbar /> here */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe" element={<Recipes />} />
          <Route path="/techniques" element={<Techniques />} />
          <Route path="/meals" element={<MealPlan />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
