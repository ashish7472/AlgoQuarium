import React from 'react';
import { Link } from 'react-router-dom';

function AlgoCard({ title, description, link }) {
  return (
    <Link to={link} className="block">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105">
        <h3 className="text-lg font-semibold text-primary dark:text-darkPrimary">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  );
}

export default AlgoCard;