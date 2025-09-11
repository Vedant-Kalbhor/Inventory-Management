import React from 'react';

export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded bg-indigo-600 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
