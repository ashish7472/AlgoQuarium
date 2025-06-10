import AlgoCard from '../components/AlgoCard';

function Home() {
  const algorithms_Searching = [
    {
      title: 'Linear Search',
      description: 'A simple search algorithm that checks every element in the list until the desired element is found or the list ends.',
      link: '/visualization/linear-search',
    },
    {
      title: 'Binary Search',
      description: 'An efficient search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
      link: '/visualization/binary-search',
    },
  ];

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
      description: 'A tree traversal algorithm that explores all nodes at the current depth level before moving to the next depth level.',
      link: '/visualization/bfs-tree',
    },

    // DFS algorithms of tree traversal
    {
      title: 'Pre-order Traversal - DFS',
      description: 'A depth-first traversal method where the root node is processed first, followed by the left subtree, then the right subtree.',
      link: '/visualization/preorder-traversal',
    },
    {
      title: 'In-order Traversal - DFS',
      description: 'A depth-first traversal method where the left subtree is processed first, then the root node, and finally the right subtree.',
      link: '/visualization/inorder-traversal',
    },
    {
      title: 'Post-order Traversal - DFS',
      description: 'A depth-first traversal method where the left subtree is processed first, then the right subtree, and finally the root node.',
      link: '/visualization/postorder-traversal',
    },
  ];

  const algorithms_Graph = [
    {
      title: 'Breadth-First Search (BFS) for Graph',
      description: 'A graph traversal algorithm that explores all vertices at the present depth prior to moving on to the vertices at the next depth level.',
      link: '/visualization/bfs-graph',
    },
    {
      title: 'Depth-First Search (DFS) for Graph',
      description: 'A graph traversal algorithm that explores as far as possible along each branch of graph before backtracking.',
      link: '/visualization/dfs-graph',
    },
    {
      title: 'Topological Sort - Kahn\'s Algorithm',
      description: 'A linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge u -> v, vertex u comes before v in the ordering.',
      link: '/visualization/topological-sort',
    },
    {
      title: 'Dijkstra\'s Algorithm',
      description: 'An algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.',
      link: '/visualization/dijkstra',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Data Structures & Algorithms Visualization</h1>
      {/* Searching Algo */}
      <h2 className="text-2xl font-bold mb-4 text-[#4a90e2]">Searching Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms_Searching.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
      <hr className="my-8 border-gray-600" />

      {/* Sorting Algo */}
      <h2 className="text-2xl font-bold mb-4 text-[#4a90e2]">Sorting Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms_Sorting.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
      <hr className="my-8 border-gray-600" />
      
      {/* Tree Traversal */}
      <h2 className="text-2xl font-bold mb-4 mt-6 text-[#4a90e2]">Tree Traversal Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms_Tree.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
      <hr className="my-8 border-gray-600" />

      {/* Graph Traversal */}
      <h2 className="text-2xl font-bold mb-4 mt-6 text-[#4a90e2]">Graph Traversal Algorithms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms_Graph.map((algo, index) => (
          <AlgoCard key={index} title={algo.title} description={algo.description} link={algo.link} />
        ))}
      </div>
      <hr className="my-8 border-gray-600" />

      {/* OS-Scheduling Algorithms */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8 text-[#4a90e2] text-center">OS-Scheduling Algorithms</h2>
      <div className="flex justify-center">
        <div className="bg-[#1e2a44] rounded-lg shadow-md p-6 border border-[#3b4a6b] max-w-md w-full text-center transform transition hover:scale-105 hover:shadow-lg animate-pulse-slow">
          <svg
            className="w-10 h-10 mx-auto mb-4 text-[#4a90e2]"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm1-15h-2v6H9v2h4V7z" />
          </svg>
          <p className="text-xl font-semibold text-[#b0b8c4] mb-2">Coming Soon!</p>
          <p className="text-sm text-[#8a94a6]">Stay tuned for interactive visualizations of OS-Scheduling algorithms like FCFS, SJF, and Round Robin.</p>
        </div>
      </div>
      
      <hr className="my-8 border-gray-600" />
    </div>
  );
}

export default Home;