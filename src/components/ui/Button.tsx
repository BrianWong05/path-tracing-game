import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) => {
  const baseStyles = "rounded-2xl font-bold flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300 shadow-lg shadow-blue-500/30",
    secondary: "bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-300 shadow-lg shadow-purple-500/30",
    outline: "border-4 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100"
  };

  const sizes = {
    sm: "px-4 py-2 text-lg",
    md: "px-6 py-3 text-xl",
    lg: "px-8 py-4 text-2xl",
    xl: "px-10 py-6 text-3xl w-full"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
