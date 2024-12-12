import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import
{
  Todo,
  Login,
  Signup,
} from './pages';

import { AuthProvider } from './context';
import { Navbar, PrivateRoute } from './components';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Todo /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;