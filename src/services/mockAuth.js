// Mock user database
const users = [
  {
    id: 1,
    email: 'admin@comfortcheck.com',
    password: 'admin123',
    name: 'John Smith',
    role: 'admin',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    email: 'manager@comfortcheck.com',
    password: 'manager123',
    name: 'Sarah Johnson',
    role: 'facility_manager',
    avatar: '👩‍🔧',
  },
  {
    id: 3,
    email: 'teacher@comfortcheck.com',
    password: 'teacher123',
    name: 'Mike Wilson',
    role: 'teacher',
    avatar: '👨‍🏫',
  },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLogin = async (credentials) => {
  await delay(1000); // Simulate network delay
  
  const user = users.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    // Store in localStorage
    localStorage.setItem('comfortcheck_user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  
  throw new Error('Invalid email or password');
};

export const mockLogout = () => {
  localStorage.removeItem('comfortcheck_user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('comfortcheck_user');
  return user ? JSON.parse(user) : null;
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  return user?.role === role;
};