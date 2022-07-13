import React from 'react';

export default function Footer() {
  return (
    <div className="flex ">
      {' '}
      <footer className="absolute inset bottom   left-[50%] translate-x-[-50%] whitespace-nowrap p-6 text-sm text-green-600">
        <p>Copyright &copy; {new Date().getFullYear()} Thera Amazon</p>
      </footer>
    </div>
  );
}
