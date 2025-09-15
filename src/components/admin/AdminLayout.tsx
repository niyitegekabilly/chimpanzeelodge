import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 admin-content">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        isCollapsed={sidebarCollapsed}
        onCollapse={toggleCollapse}
      />
      
      {/* Main content */}
      <div className={`admin-main transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Header */}
        <AdminHeader onMenuToggle={toggleSidebar} title="Admin Dashboard" />
        
        {/* Page content */}
        <main className="p-6 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
