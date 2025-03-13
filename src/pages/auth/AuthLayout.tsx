
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-secondary/30 rtl">
      <div className="container mx-auto p-4">
        <header className="flex justify-center py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-semibold text-lg">ت</span>
            </div>
            <h1 className="text-xl font-semibold">تكنوريجستر</h1>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
