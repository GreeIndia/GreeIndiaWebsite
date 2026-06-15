import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;