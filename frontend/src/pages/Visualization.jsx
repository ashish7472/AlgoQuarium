import { useParams } from 'react-router-dom';
import SortViz from '../components/SortViz';

function Visualization() {
  const { algo } = useParams();

  const algorithmDetails = {
    'bubble-sort': {
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      complexity: 'Time: O(n²), Space: O(1)',
    },
  };

  const details = algorithmDetails[algo] || { title: 'Unknown Algorithm', description: 'Not found.', complexity: '' };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4 text-white">{details.title}</h1>
      <div className="bg-[#2c3e50] rounded-lg shadow-lg p-6 mb-6 max-w-3xl mx-auto border border-[#3b4a6b]">
        <p className="text-[#b0b8c4] mb-2">{details.description}</p>
        <p className="text-[#b0b8c4]"><strong>Complexity:</strong> {details.complexity}</p>
      </div>
      {algo === 'bubble-sort' && <SortViz algorithm={algo} />}
    </div>
  );
}

export default Visualization;