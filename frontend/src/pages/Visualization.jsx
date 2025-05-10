import { useParams } from 'react-router-dom';
import SortViz from '../components/SortViz';

function Visualization() {
  const { algo } = useParams();

  const algorithmDetails = {
    'bubble-sort': {
      title: 'Bubble Sort',
      description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      complexity: 'Time: O(n²), Space: O(1)',
    },
  };

  const details = algorithmDetails[algo] || { title: 'Unknown Algorithm', description: 'Not found.', complexity: '' };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary dark:text-darkPrimary">{details.title}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 max-w-3xl mx-auto border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 mb-2">{details.description}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Complexity:</strong> {details.complexity}</p>
      </div>
      {algo === 'bubble-sort' && <SortViz algorithm={algo} />}
    </div>
  );
}

export default Visualization;