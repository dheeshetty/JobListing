import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
