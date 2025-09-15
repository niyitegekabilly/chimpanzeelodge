import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bed, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Image,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed?: boolean;
  onCollapse?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle, isCollapsed = false, onCollapse }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { name: 'Rooms', path: '/admin/rooms', icon: Bed },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Media', path: '/admin/media', icon: Image },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full bg-white shadow-lg transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto lg:flex-shrink-0
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              {!isCollapsed && (
                <span className="ml-3 text-lg font-semibold text-gray-900">Admin Panel</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {onCollapse && (
                <button
                  onClick={onCollapse}
                  className="hidden lg:block p-1 rounded-md hover:bg-gray-100"
                  title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <Menu className="h-5 w-5 text-gray-500" />
                </button>
              )}
              <button
                onClick={onToggle}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className={`border-b border-gray-200 ${isCollapsed ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              {!isCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 py-6 space-y-2 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center text-sm font-medium rounded-lg transition-colors duration-200
                    ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-2'}
                    ${isActive(item.path)
                      ? 'bg-green-100 text-green-700 border-r-2 border-green-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  onClick={() => {
                    // Close mobile menu when navigating
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className={`border-t border-gray-200 ${isCollapsed ? 'p-2' : 'p-4'}`}>
            <button
              onClick={logout}
              className={`flex items-center w-full text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ${
                isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-2'
              }`}
              title={isCollapsed ? 'Sign Out' : undefined}
            >
              <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
