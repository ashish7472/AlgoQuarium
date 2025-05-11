import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#1e2a44] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-[#4a90e2] transition">
          AlgoQuarium
        </Link>

        {/* Hamburger Button (Visible on Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Menu Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-12 absolute md:static top-16 left-0 right-0 bg-[#1e2a44] md:bg-transparent p-4 md:p-0 z-10 transition-all duration-300`}
        >
          <Link
            to="/"
            className="block md:inline-block text-white hover:text-[#4a90e2] transition py-2 md:py-0"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block md:inline-block text-white hover:text-[#4a90e2] transition py-2 md:py-0"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact-me"
            className="block md:inline-block text-white hover:text-[#4a90e2] transition py-2 md:py-0"
            onClick={() => setIsOpen(false)}
          >
            Contact Me
          </Link>
          <Link
            to="/testimonials"
            className="block md:inline-block text-white hover:text-[#4a90e2] transition py-2 md:py-0"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            to="/other-work"
            className="block md:inline-block text-white hover:text-[#4a90e2] transition py-2 md:py-0"
            onClick={() => setIsOpen(false)}
          >
            Other Work
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;