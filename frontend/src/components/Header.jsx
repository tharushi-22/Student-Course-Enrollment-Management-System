import React from 'react';
import { FaGraduationCap, FaSignOutAlt, FaUserCircle, FaBell, FaCog } from 'react-icons/fa';

const Header = ({ user, onLogout, notifications }) => {
  const handleLogout = () => {
    onLogout();
  };

  const unreadNotifications = notifications?.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
              <FaGraduationCap className="relative text-white text-3xl transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold tracking-tight">
                StudentPro
              </h1>
              <p className="text-blue-100 text-sm font-light">
                Modern Student Course Enrollment Management Platform
              </p>
            </div>
          </div>
          
          {/* User Info & Actions */}
          {user && (
            <div className="flex items-center space-x-6">

              {/* User Profile */}
              <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <FaUserCircle className="text-white text-2xl" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{user.username}</p>
                    <p className="text-blue-100 text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/30"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-white/30 hover:bg-white/40 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  <FaSignOutAlt />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
    </header>
  );
};

export default Header;