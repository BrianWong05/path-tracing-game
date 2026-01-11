import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div className={`min-h-screen w-full bg-slate-50 relative overflow-hidden ${className}`}>
      <main className="container mx-auto px-4 py-6 h-full min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  );
};
