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
        <main className="p-6 bg-blue-100 min-h-screen">
          <div className="bg-green-200 p-4 mb-4">
            <h2 className="text-xl font-bold">Admin Layout Content Area</h2>
            <p>This should be visible if the layout is working</p>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
