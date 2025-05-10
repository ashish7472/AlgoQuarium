import React from 'react';
import AlgoCard from '../components/AlgoCard';

function Home() {
  const algorithms = [
    {
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      link: '/visualization/bubble-sort',
    },
    // Add more algorithms here
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Data Structures & Algorithms Visualization</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
    </div>
  );
}

export default Home;