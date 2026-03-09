import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Input from '../common/Input';
import logo from "../../assets/logo.png";

const LoginForm = ({ onSuccess }) => {
  const { login, loading } = useAuth();
  const { addNotification } = useNotifications();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const newErrors = validateLogin();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      addNotification({
        type: 'success',
        message: `Welcome back, ${result.user?.name || 'User'}!`,
      });
      onSuccess?.();
    } else {
      setErrors({ form: result.error });
      addNotification({
        type: 'error',
        message: 'Login failed: ' + result.error,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const newErrors = validateSignup();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addNotification({
      type: 'success',
      message: 'Account created successfully! You can now log in.',
    });
    
    setIsLogin(true);
    setFormData({
      email: formData.email,
      password: '',
      name: '',
      confirmPassword: '',
    });
  };

  const handleMobileApp = () => {
    setShowMobileMessage(true);
    addNotification({
      type: 'info',
      message: '📱 Mobile app is under development. Coming soon!',
      duration: 5000,
    });
    
    setTimeout(() => setShowMobileMessage(false), 5000);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <header className="login-header">
          <img 
            src={logo} 
            alt="ComfortCheck Logo"
            className="login-logo"
          />
        </header>

        <main className="login-card">
          <div className="login-tabs" role="tablist">
            <button
              onClick={() => setIsLogin(true)}
              className={`login-tab ${isLogin ? 'active' : ''}`}
              role="tab"
              aria-selected={isLogin}
              aria-controls="login-panel"
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`login-tab ${!isLogin ? 'active' : ''}`}
              role="tab"
              aria-selected={!isLogin}
              aria-controls="signup-panel"
            >
              Sign up
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleSignup} className="login-form" noValidate>
            {errors.form && (
              <div className="form-error" role="alert">
                {errors.form}
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter your full name"
                  aria-required="true"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Enter your email"
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-field">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Enter your password"
                  className="password-input"
                  aria-required="true"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span aria-hidden="true">{showPassword ? '👁️' : '👁️‍🗨️'}</span>
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                  aria-required="true"
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
              </div>
            )}

            <div className="form-group">
              <button
                type="button"
                onClick={handleMobileApp}
                className="mobile-app-button"
              >
                📱 Student & Instructor (Mobile Only)
              </button>
              
              {showMobileMessage && (
                <div className="mobile-app-message" role="status" aria-live="polite">
                  🚧 Mobile app is under development. Coming soon!
                </div>
              )}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
              aria-describedby={loading ? 'submit-status' : undefined}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
            {loading && (
              <span id="submit-status" className="sr-only">Processing your request</span>
            )}
          </form>

          <section className="demo-section" aria-label="Demo Credentials">
            <h2 className="demo-title">Demo Credentials</h2>
            <div className="demo-grid">
              <div className="demo-card">
                <p className="demo-role">Admin</p>
                <p className="demo-email">admin@comfortcheck</p>
              </div>
              <div className="demo-card">
                <p className="demo-role">Manager</p>
                <p className="demo-email">manager@comfortcheck</p>
              </div>
              <div className="demo-card">
                <p className="demo-role">Teacher</p>
                <p className="demo-email">teacher@comfortcheck</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LoginForm;