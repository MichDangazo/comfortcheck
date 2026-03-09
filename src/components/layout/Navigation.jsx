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
    { path: '/devices', label: 'Device Health', icon: '📱', roles: ['admin', 'facility_manager'] },
    { path: '/settings', label: 'Settings', icon: '⚙️', roles: ['admin', 'facility_manager', 'teacher'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="navigation-container">
        <div className="navigation-content">
          <div className="navigation-links">
            {filteredNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `navigation-link ${isActive ? 'active' : ''}`
                }
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                <span className="navigation-link-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
                {item.path === '/' && unreadCount > 0 && (
                  <Badge variant="danger" size="sm" className="navigation-badge" aria-label={`${unreadCount} unread notifications`}>
                    {unreadCount}
                  </Badge>
                )}
              </NavLink>
            ))}
          </div>

          <div className="navigation-controls">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="text-xl" aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>

            <div className="user-info">
              <span className="user-avatar" aria-hidden="true">{user?.avatar}</span>
              <div className="user-details">
                <p className="user-name">{user?.name}</p>
                <p className="user-role">{user?.role?.replace('_', ' ')}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="logout-button"
              aria-label="Logout"
            >
              <span className="text-xl" aria-hidden="true">🚪</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;