//App.js

import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import JobPost from './pages/JobPost/JobPost';
import Details from './pages/Details/Details';


function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/jobpost" element={<JobPost/>} />
        <Route path="/details/:id" element={<Details/>} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
