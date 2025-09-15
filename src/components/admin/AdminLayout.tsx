import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <AdminHeader onMenuToggle={toggleSidebar} title="Admin Dashboard" />
        
        {/* Page content */}
        <main className="p-6 pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
