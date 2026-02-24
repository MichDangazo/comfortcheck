import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';  // Add this
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import LoginForm from './components/auth/LoginForm';
import CampusOverview from './pages/CampusOverview';
import RoomDetails from './pages/RoomDetails';
import DeviceHealth from './pages/DeviceHealth';
import Settings from './pages/Settings';
import { useAuth } from './contexts/AuthContext';

// Login page component
const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
      <LoginForm />
    </div>
  );
};

// Main app content with navigation
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CampusOverview />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/rooms/:roomId"
          element={
            <ProtectedRoute>
              <RoomDetails />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <DeviceHealth />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />

          // Add this near your routes
        <Route path="/debug" element={
          <div>
            <h1>Debug Page</h1>
            <p>Current Path: {window.location.pathname}</p>
            <p>Available Routes:</p>
            <ul>
              <li>/</li>
              <li>/rooms/:roomId</li>
              <li>/devices</li>
              <li>/settings</li>
              <li>/login</li>
            </ul>
            <button onClick={() => navigate('/rooms/1')}>Test Room 1</button>
            <button onClick={() => navigate('/rooms/2')}>Test Room 2</button>
          </div>
        } />

      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>      {/* Add this wrapper */}
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

<Route path="/debug" element={<div>Routes working! Check console</div>} />

export default App;