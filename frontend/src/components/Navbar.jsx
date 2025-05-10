import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-primary dark:text-darkPrimary">
          DS & Algo Viz
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-primary dark:hover:text-darkPrimary transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary dark:hover:text-darkPrimary transition">
            About
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;