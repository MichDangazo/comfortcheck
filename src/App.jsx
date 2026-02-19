import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CampusOverview from './pages/CampusOverview';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);

    const handleStorageChange = () => {
      const newToken = localStorage.getItem('authToken');
      setIsAuthenticated(!!newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Root path - always show login */}
        <Route path="/" element={<Login />} />
        
        {/* Dashboard route - protected */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <CampusOverview />
            </PrivateRoute>
          } 
        />
        
        {/* Signup route */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Catch all other routes */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;