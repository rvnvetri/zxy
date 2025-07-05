// src/layouts/SidebarLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Toggle checkbox for mobile */}
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col p-4">
        {/* Mobile hamburger */}
        <div className="lg:hidden mb-4">
          <label htmlFor="sidebar-drawer" className="btn btn-primary btn-sm drawer-button">
            ☰ Menu
          </label>
        </div>
        
        <Outlet /> {/* your page content here */}
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarLayout;
