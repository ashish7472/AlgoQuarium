import { Link } from 'react-router-dom';

function AlgoCard({ title, description, link }) {
  return (
    <Link to={link} className="block">
      <div className="bg-[#2c3e50] rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105">
        <h3 className="text-lg font-semibold text-white hover:text-[#4a90e2] transition">{title}</h3>
        <p className="mt-2 text-[#b0b8c4]">{description}</p>
      </div>
    </Link>
  );
}

export default AlgoCard;