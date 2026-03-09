import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import LoginForm from './components/auth/LoginForm';
import CampusOverview from './pages/CampusOverview';
import DeviceHealth from './pages/DeviceHealth';
import Settings from './pages/Settings';
import { useAuth } from './contexts/AuthContext';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <main className="login-container">
      <LoginForm />
    </main>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="main-layout">
      {isAuthenticated && <Navigation />}
      <div className="page-container">
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
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
