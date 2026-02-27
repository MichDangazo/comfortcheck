import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = ({ onSuccess }) => {
  const { login, loading } = useAuth();
  const { addNotification } = useNotifications();
  
  // Controlled component state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // For signup
    confirmPassword: '', // For signup
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  // Handle input changes
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

  // Validate login form
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

  // Validate signup form
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

  // Handle login submission
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

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    
    const newErrors = validateSignup();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate signup - in a real app, this would call an API
    addNotification({
      type: 'success',
      message: 'Account created successfully! You can now log in.',
    });
    
    // Switch to login tab after successful signup
    setIsLogin(true);
    setFormData({
      email: formData.email,
      password: '',
      name: '',
      confirmPassword: '',
    });
  };

  // Handle mobile app button
  const handleMobileApp = () => {
    setShowMobileMessage(true);
    addNotification({
      type: 'info',
      message: '📱 Mobile app is under development. Coming soon!',
      duration: 5000,
    });
    
    // Hide message after 5 seconds
    setTimeout(() => setShowMobileMessage(false), 5000);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl"> {/* Increased to max-w-2xl for wider card */}
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img 
            src="/src/assets/logo.png" 
            alt="Classroom Heat Monitor Logo"
            className="mx-auto mb-4 max-w-full h-auto"
            style={{ maxHeight: '510px' }} // Adjust size as needed
          />
        </div>

        {/* Login/Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-amber-200">
          {/* Tabs */}
          <div className="flex mb-8 border-b border-amber-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 text-center font-medium text-lg transition-colors ${
                isLogin
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-amber-600 hover:text-orange-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 text-center font-medium text-lg transition-colors ${
                !isLogin
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-amber-600 hover:text-orange-600'
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">
            {errors.form && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {errors.form}
              </div>
            )}

            {/* Signup Fields */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter your full name"
                  className="w-full border-amber-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Enter your email"
                className="w-full border-amber-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Enter your password"
                  className="w-full pr-10 border-amber-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-orange-600"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Confirm Password
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                  className="w-full border-amber-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            )}

            {/* Mobile App Button with Message Below */}
            <div className="relative">
              <button
                type="button"
                onClick={handleMobileApp}
                className="w-full py-4 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium rounded-lg transition-colors border border-amber-300 text-lg"
              >
                📱 Student & Instructor (Mobile Only)
              </button>
              
              {/* Under Development Message - Below the button */}
              {showMobileMessage && (
                <div className="mt-3 p-4 bg-amber-100 border border-amber-300 rounded-lg text-base text-amber-800 animate-fadeIn text-center">
                  🚧 Mobile app is under development. Coming soon!
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-4 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-amber-200">
            <p className="text-sm text-amber-600 text-center mb-4">
              Demo Credentials
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">Admin</p>
                <p className="text-amber-600 text-xs mt-1">admin@</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">Manager</p>
                <p className="text-amber-600 text-xs mt-1">manager@</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">Teacher</p>
                <p className="text-amber-600 text-xs mt-1">teacher@</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;