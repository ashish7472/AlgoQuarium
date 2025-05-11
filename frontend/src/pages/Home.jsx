import AlgoCard from '../components/AlgoCard';

function Home() {
  const algorithms_Sorting = [
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

  const algorithms_Tree = [
    {
      title: 'Breadth-First Search (BFS) for Tree',
      description: 'A tree traversal algorithm that explores all nodes at the current depth before moving to the next depth level.',
      link: '/visualization/bfs-tree',
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Data Structures & Algorithms Visualization</h1>
      {/* Sorting Algo */}
      <h2 className="text-2xl font-bold mb-4 text-[#4a90e2]">Sorting Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms_Sorting.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
      
      {/* Tree Traversal */}
      <h2 className="text-2xl font-bold mb-4 mt-6 text-[#4a90e2]">Tree Traversal Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms_Tree.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
    </div>
  );
}

export default Home;