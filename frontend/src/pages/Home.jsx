import AlgoCard from '../components/AlgoCard';

function Home() {
  const algorithms = [
    {
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      link: '/visualization/bubble-sort',
    },
    {
      title: 'Selection Sort',
      description: 'A sorting algorithm that selects the smallest element from the unsorted portion and places it at the beginning of the sorted portion.',
      link: '/visualization/selection-sort',
    },
    {
      title: 'Insertion Sort',
      description: 'A sorting algorithm that builds the sorted array one element at a time by inserting each element into its correct position.',
      link: '/visualization/insertion-sort',
    },
    {
      title: 'Merge Sort',
      description: 'A divide-and-conquer algorithm that splits the array into halves, sorts them recursively, and merges them back together.',
      link: '/visualization/merge-sort',
    },
    {
      title: 'Quick Sort',
      description: 'A divide-and-conquer algorithm that picks a pivot, partitions the array around it, and recursively sorts the sub-arrays.',
      link: '/visualization/quick-sort',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Data Structures & Algorithms Visualization</h1>
      <h2 className="text-2xl font-bold mb-4 text-white">Sorting Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
    </div>
  );
}

export default Home;