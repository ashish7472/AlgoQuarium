import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-transparent shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-white hover:text-[#4a90e2] transition">
          AlgoQuarium
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-[#4a90e2] transition">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-[#4a90e2] transition">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;