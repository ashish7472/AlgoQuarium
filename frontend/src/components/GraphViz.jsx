import { useEffect, useRef, useState } from 'react';

function GraphViz({ algorithm }) {
  const canvasRef = useRef(null);
  const stopRef = useRef(false); // To control stopping the loop
  const [graph, setGraph] = useState(null); // Adjacency list
  const [positions, setPositions] = useState([]); // Node positions
  const [isTraversing, setIsTraversing] = useState(false);
  const [speed, setSpeed] = useState(245);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [queue, setQueue] = useState([]); // For BFS queue display
  const [traversalNodes, setTraversalNodes] = useState([]); // Nodes to process (queue for BFS, generator output for DFS)
  const [currentResult, setCurrentResult] = useState([]); // Store traversal order for resuming
  const [visitedState, setVisitedState] = useState([]); // Store visited nodes for resuming
  const [lastHighlightedNode, setLastHighlightedNode] = useState(null); // Store last highlighted node

  const canvasWidth = 800;
  const canvasHeight = 400;
  const nodeRadius = 20;
  const numNodes = 8; // Fixed number of nodes

  // Generate a random graph (allow disconnected components)
  const generateGraph = () => {
    const adjList = Array.from({ length: numNodes }, () => []);
    const edgeProbability = 0.2; // Probability of an edge between two nodes

    // Generate random edges (undirected graph)
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() < edgeProbability) {
          adjList[i].push(j);
          adjList[j].push(i); // Undirected: add edge in both directions
        }
      }
    }

    // Note: We no longer force connectivity, allowing disconnected components
    return adjList;
  };

  // Position nodes in a circular layout
  const positionNodes = () => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(canvasWidth, canvasHeight) / 3; // Radius of the circle

    const positions = [];
    for (let i = 0; i < numNodes; i++) {
      const angle = (2 * Math.PI * i) / numNodes;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions.push({ x, y });
    }
    return positions;
  };

  // Draw the graph on canvas
  const drawGraph = (adjList, positions, highlightedNode = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#1e2a44');
    gradient.addColorStop(1, '#2c3e50');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (!adjList || !positions) return;

    // Draw edges
    for (let u = 0; u < numNodes; u++) {
      for (const v of adjList[u]) {
        if (u < v) { // Draw each edge once (undirected graph)
          ctx.beginPath();
          ctx.moveTo(positions[u].x, positions[u].y);
          ctx.lineTo(positions[v].x, positions[v].y);
          ctx.strokeStyle = '#b0b8c4';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < numNodes; i++) {
      ctx.beginPath();
      ctx.arc(positions[i].x, positions[i].y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = i === highlightedNode ? '#4a90e2' : '#b0b8c4';
      ctx.fill();
      ctx.strokeStyle = '#3b4a6b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '14px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), positions[i].x, positions[i].y);
    }
  };

  // Calculate delay from speed
  const getDelayFromSpeed = (speedValue) => {
    const minDelay = 100;
    const maxDelay = 2000;
    return maxDelay - ((speedValue - 10) * (maxDelay - minDelay)) / (500 - 10);
  };

  // BFS implementation with support for disconnected components
  const runBfs = async (startFresh = true) => {
    if (!graph) return;

    setIsTraversing(true);
    stopRef.current = false;

    let nodesToProcess = startFresh ? [0] : [...traversalNodes]; // Start from node 0 or resume
    let result = startFresh ? [] : [...currentResult];
    let visited = startFresh ? Array(numNodes).fill(false) : [...visitedState];

    if (startFresh) {
      setTraversalOrder([]);
      setQueue([]);
      if (nodesToProcess.length > 0) {
        visited[nodesToProcess[0]] = true; // Mark the starting node as visited
      }
    }

    // Process all components
    while (true) {
      // Process the current component
      while (nodesToProcess.length > 0) {
        if (stopRef.current) {
          setTraversalNodes([...nodesToProcess]);
          setCurrentResult([...result]);
          setVisitedState([...visited]);
          setIsTraversing(false);
          return;
        }

        const node = nodesToProcess.shift();
        result.push(node);
        setTraversalOrder([...result]);
        setLastHighlightedNode(node);
        drawGraph(graph, positions, node);
        setQueue([...nodesToProcess]);

        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            nodesToProcess.push(neighbor);
            visited[neighbor] = true;
          }
        }

        if (nodesToProcess.length > 0) {
          setQueue([...nodesToProcess]);
        }

        await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
      }

      // Find an unvisited node to start the next component
      const nextUnvisited = visited.findIndex(v => !v);
      if (nextUnvisited === -1) break; // All nodes visited

      nodesToProcess.push(nextUnvisited);
      visited[nextUnvisited] = true;
      setQueue([...nodesToProcess]);
    }

    setIsTraversing(false);
    setQueue([]);
    setTraversalNodes([]);
    setCurrentResult([]);
    setVisitedState([]);
    setLastHighlightedNode(null);
    drawGraph(graph, positions);
  };

  // Generator for DFS traversal across all components
  function* dfsGenerator(adjList, visited) {
    for (let start = 0; start < numNodes; start++) {
      if (visited[start]) continue;

      const stack = [start];
      visited[start] = true;

      while (stack.length > 0) {
        const node = stack.pop();
        yield node;

        // Push neighbors in reverse order to simulate recursion
        const neighbors = adjList[node].slice().reverse();
        for (const neighbor of neighbors) {
          if (!visited[neighbor]) {
            stack.push(neighbor);
            visited[neighbor] = true;
          }
        }
      }
    }
  }

  // DFS implementation with support for disconnected components
  const runDfs = async (startFresh = true) => {
    if (!graph) return;

    setIsTraversing(true);
    stopRef.current = false;

    let visited = startFresh ? Array(numNodes).fill(false) : [...visitedState];
    let nodesToProcess = startFresh ? [] : [...traversalNodes];
    let result = startFresh ? [] : [...currentResult];

    if (startFresh) {
      setTraversalOrder([]);
      nodesToProcess = Array.from(dfsGenerator(graph, visited));
    } else {
      // For resumption: Continue from where we left off
      // The visited array is already updated, so we just process the remaining nodes
    }

    while (nodesToProcess.length > 0) {
      if (stopRef.current) {
        setTraversalNodes([...nodesToProcess]);
        setCurrentResult([...result]);
        setVisitedState([...visited]);
        setIsTraversing(false);
        return;
      }

      const node = nodesToProcess.shift();
      result.push(node);
      setTraversalOrder([...result]);
      setLastHighlightedNode(node);
      drawGraph(graph, positions, node);

      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }

    setIsTraversing(false);
    setTraversalNodes([]);
    setCurrentResult([]);
    setVisitedState([]);
    setLastHighlightedNode(null);
    drawGraph(graph, positions);
  };

  // Start or resume traversal based on algorithm
  const startOrResumeTraversal = () => {
    const shouldResume = traversalNodes.length > 0;
    if (algorithm === 'bfs-graph') {
      runBfs(!shouldResume);
    } else if (algorithm === 'dfs-graph') {
      runDfs(!shouldResume);
    }
  };

  // Stop the traversal
  const stopTraversalHandler = () => {
    stopRef.current = true;
  };

  // Reset graph
  const resetGraph = () => {
    const newGraph = generateGraph();
    const newPositions = positionNodes();
    setGraph(newGraph);
    setPositions(newPositions);
    setTraversalOrder([]);
    setQueue([]);
    setTraversalNodes([]);
    setCurrentResult([]);
    setVisitedState([]);
    setLastHighlightedNode(null);
    stopRef.current = false;
    setIsTraversing(false);
  };

  useEffect(() => {
    resetGraph();
  }, []);

  useEffect(() => {
    if (graph && positions && !isTraversing) {
      drawGraph(graph, positions, lastHighlightedNode);
    }
  }, [graph, positions, lastHighlightedNode]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="border border-[#3b4a6b] mb-4 rounded-lg shadow-md" />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <button
          onClick={resetGraph}
          disabled={isTraversing}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          Reset Graph
        </button>
        <button
          onClick={startOrResumeTraversal}
          disabled={isTraversing}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          Start Traversal
        </button>
        <button
          onClick={stopTraversalHandler}
          disabled={!isTraversing}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          Stop Traversal
        </button>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <div>
          <label className="block mb-1 text-[#b0b8c4] text-sm md:text-base">Speed:</label>
          <input
            type="range"
            min="10"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isTraversing}
            className="w-40 accent-[#4a90e2]"
          />
        </div>
      </div>
      <div className="text-[#b0b8c4] text-sm md:text-base">
        {algorithm === 'bfs-graph' && queue.length > 0 && <p>Queue: [{queue.join(', ')}]</p>}
        {traversalOrder.length > 0 && <p>Traversal Order: [{traversalOrder.join(', ')}]</p>}
      </div>
    </div>
  );
}

export default GraphViz;