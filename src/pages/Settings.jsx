import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Settings = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  
  // Local storage for preferences
  const [preferences, setPreferences] = useLocalStorage('comfortcheck_preferences', {
    theme: 'light',
    notifications: true,
    refreshInterval: 10,
    temperatureUnit: 'celsius',
  });

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    theme: preferences.theme,
    notifications: preferences.notifications,
    refreshInterval: preferences.refreshInterval,
    temperatureUnit: preferences.temperatureUnit,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update form when user changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
    }));
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle radio changes separately
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      addNotification({
        type: 'error',
        message: 'Name is required',
      });
      return false;
    }
    
    if (!formData.email.trim()) {
      addNotification({
        type: 'error',
        message: 'Email is required',
      });
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      addNotification({
        type: 'error',
        message: 'Email is invalid',
      });
      return false;
    }
    
    return true;
  };

  // Save settings
  const handleSave = () => {
    if (!validateForm()) return;
    
    setIsSaving(true);

    // Update preferences in local storage
    setPreferences({
      theme: formData.theme,
      notifications: formData.notifications,
      refreshInterval: parseInt(formData.refreshInterval),
      temperatureUnit: formData.temperatureUnit,
    });

    // Simulate API call
    setTimeout(() => {
      addNotification({
        type: 'success',
        message: 'Settings saved successfully!',
      });

      setIsEditing(false);
      setIsSaving(false);
    }, 500);
  };

  // Cancel editing
  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      theme: preferences.theme,
      notifications: preferences.notifications,
      refreshInterval: preferences.refreshInterval,
      temperatureUnit: preferences.temperatureUnit,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Make Changes
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={user?.role?.replace('_', ' ') || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Display Preferences</h2>
          
          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex gap-6">
                {[
                  { value: 'light', label: '☀️ Light' },
                  { value: 'dark', label: '🌙 Dark' },
                  { value: 'system', label: '💻 System' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={option.value}
                      checked={formData.theme === option.value}
                      onChange={() => handleRadioChange('theme', option.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Temperature Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature Unit
              </label>
              <div className="flex gap-6">
                {[
                  { value: 'celsius', label: '°C Celsius' },
                  { value: 'fahrenheit', label: '°F Fahrenheit' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="temperatureUnit"
                      value={option.value}
                      checked={formData.temperatureUnit === option.value}
                      onChange={() => handleRadioChange('temperatureUnit', option.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notifications Toggle */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Enable desktop notifications</span>
              </label>
            </div>

            {/* Refresh Interval */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-refresh Interval
              </label>
              <select
                name="refreshInterval"
                value={formData.refreshInterval}
                onChange={handleChange}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                How often the dashboard updates with new data
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}

        {/* Current Preferences Summary */}
        {!isEditing && (
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">Current Preferences</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-blue-600">Theme:</span>
              <span className="text-blue-800 capitalize">{preferences.theme}</span>
              <span className="text-blue-600">Temperature Unit:</span>
              <span className="text-blue-800">{preferences.temperatureUnit === 'celsius' ? '°C' : '°F'}</span>
              <span className="text-blue-600">Notifications:</span>
              <span className="text-blue-800">{preferences.notifications ? 'On' : 'Off'}</span>
              <span className="text-blue-600">Refresh Interval:</span>
              <span className="text-blue-800">{preferences.refreshInterval} seconds</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;