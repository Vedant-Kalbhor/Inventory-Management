import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t p-4 text-center text-sm">
      © {new Date().getFullYear()} Inventory Management
    </footer>
  );
}
