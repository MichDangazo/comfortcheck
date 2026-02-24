import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useTheme } from '../../contexts/ThemeContext';
import Badge from '../common/Badge';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const { theme, toggleTheme } = useTheme();

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊', roles: ['admin', 'facility_manager', 'teacher'] },
    { path: '/rooms', label: 'Room Details', icon: '🏫', roles: ['admin', 'facility_manager', 'teacher'] },
    { path: '/devices', label: 'Device Health', icon: '📱', roles: ['admin', 'facility_manager'] },
    { path: '/settings', label: 'Settings', icon: '⚙️', roles: ['admin', 'facility_manager', 'teacher'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {filteredNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
                {item.path === '/' && unreadCount > 0 && (
                  <Badge variant="danger" size="sm" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-2xl">{user?.avatar}</span>
              <div className="text-sm">
                <p className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <span className="sr-only">Logout</span>
              <span>🚪</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;