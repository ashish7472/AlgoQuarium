import { useEffect, useRef, useState } from 'react';

function GraphViz({ algorithm }) {
  const canvasRef = useRef(null);
  const stopRef = useRef(false); // To control stopping the loop
  const [graph, setGraph] = useState(null); // Adjacency list
  const [positions, setPositions] = useState([]); // Node positions
  const [isTraversing, setIsTraversing] = useState(false);
  const [speed, setSpeed] = useState(245);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [queue, setQueue] = useState([]); // For BFS and Topological Sort queue display
  const [traversalNodes, setTraversalNodes] = useState([]); // Nodes to process
  const [currentResult, setCurrentResult] = useState([]); // Store traversal order for resuming
  const [visitedState, setVisitedState] = useState([]); // Store visited nodes for resuming
  const [inDegrees, setInDegrees] = useState([]); // Store in-degrees for Topological Sort resuming
  const [lastHighlightedNode, setLastHighlightedNode] = useState(null); // Store last highlighted node

  const canvasWidth = 800;
  const canvasHeight = 400;
  const nodeRadius = 20;
  const numNodes = 8; // Fixed number of nodes

  // Generate a graph (undirected for BFS/DFS, directed acyclic for Topological Sort)
  const generateGraph = () => {
    const adjList = Array.from({ length: numNodes }, () => []);
    const edgeProbability = 0.2; // Probability of an edge between two nodes

    if (algorithm === 'topological-sort') {
      // Generate a Directed Acyclic Graph (DAG) for Topological Sort
      // Edges go from lower-indexed to higher-indexed nodes to ensure no cycles
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          if (Math.random() < edgeProbability) {
            adjList[i].push(j); // Directed edge from i to j
          }
        }
      }
    } else {
      // Generate an undirected graph for BFS and DFS (allow disconnected components)
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          if (Math.random() < edgeProbability) {
            adjList[i].push(j);
            adjList[j].push(i); // Undirected: add edge in both directions
          }
        }
      }
    }

    return adjList;
  };

  // Position nodes (circular for BFS/DFS, layered for Topological Sort)
  const positionNodes = (adjList) => {
    if (algorithm === 'topological-sort') {
      // Layered layout for Topological Sort
      const inDegree = Array(numNodes).fill(0);
      const levels = Array(numNodes).fill(0); // Level of each node

      // Calculate in-degrees
      for (let u = 0; u < numNodes; u++) {
        for (const v of adjList[u]) {
          inDegree[v]++;
        }
      }

      // Assign levels using a simplified topological sort
      const queue = [];
      for (let i = 0; i < numNodes; i++) {
        if (inDegree[i] === 0) {
          queue.push(i);
          levels[i] = 0;
        }
      }

      while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbor of adjList[node]) {
          inDegree[neighbor]--;
          if (inDegree[neighbor] === 0) {
            queue.push(neighbor);
            levels[neighbor] = levels[node] + 1;
          }
        }
      }

      // Calculate max level for scaling
      const maxLevel = Math.max(...levels, 1);
      const levelHeight = canvasHeight / (maxLevel + 2); // Space out levels

      // Position nodes in each level
      const positions = [];
      const nodesPerLevel = Array(maxLevel + 1).fill(0); // Count nodes per level
      for (let i = 0; i < numNodes; i++) {
        nodesPerLevel[levels[i]]++;
      }

      const levelOffsets = Array(maxLevel + 1).fill(0); // Track x-offset for each level
      for (let i = 0; i < numNodes; i++) {
        const level = levels[i];
        const nodesInLevel = nodesPerLevel[level];
        const xSpacing = canvasWidth / (nodesInLevel + 1);
        const x = (levelOffsets[level] + 1) * xSpacing;
        const y = (level + 1) * levelHeight;
        positions[i] = { x, y };
        levelOffsets[level]++;
      }

      return positions;
    } else {
      // Circular layout for BFS and DFS
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const radius = Math.min(canvasWidth, canvasHeight) / 3;

      const positions = [];
      for (let i = 0; i < numNodes; i++) {
        const angle = (2 * Math.PI * i) / numNodes;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        positions.push({ x, y });
      }
      return positions;
    }
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
        // Adjust edge position to avoid overlapping with node boundaries
        const dx = positions[v].x - positions[u].x;
        const dy = positions[v].y - positions[u].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const offsetX = (dx * nodeRadius) / dist;
        const offsetY = (dy * nodeRadius) / dist;

        const startX = positions[u].x + offsetX;
        const startY = positions[u].y + offsetY;
        const endX = positions[v].x - offsetX;
        const endY = positions[v].y - offsetY;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#b0b8c4';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw arrowhead for directed edges (Topological Sort)
        if (algorithm === 'topological-sort') {
          const angle = Math.atan2(dy, dx);
          const arrowSize = 10;
          ctx.beginPath();
          ctx.moveTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(endX, endY);
          ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
          ctx.strokeStyle = '#b0b8c4';
          ctx.fillStyle = '#b0b8c4';
          ctx.fill();
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

    let nodesToProcess = startFresh ? [0] : [...traversalNodes];
    let result = startFresh ? [] : [...currentResult];
    let visited = startFresh ? Array(numNodes).fill(false) : [...visitedState];

    if (startFresh) {
      setTraversalOrder([]);
      setQueue([]);
      if (nodesToProcess.length > 0) {
        visited[nodesToProcess[0]] = true;
      }
    }

    while (true) {
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

      const nextUnvisited = visited.findIndex(v => !v);
      if (nextUnvisited === -1) break;

      nodesToProcess.push(nextUnvisited);
      visited[nextUnvisited] = true;
      setQueue([...nodesToProcess]);
    }

    setIsTraversing(false);
    setQueue([]);
    setTraversalNodes([]);
    setCurrentResult([]);
    setVisitedState([]);
    setInDegrees([]);
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
    setInDegrees([]);
    setLastHighlightedNode(null);
    drawGraph(graph, positions);
  };

  // Topological Sort using Kahn's Algorithm
  const runTopologicalSort = async (startFresh = true) => {
    if (!graph) return;

    setIsTraversing(true);
    stopRef.current = false;

    let inDegree = startFresh ? Array(numNodes).fill(0) : [...inDegrees];
    let nodesToProcess = startFresh ? [] : [...traversalNodes];
    let result = startFresh ? [] : [...currentResult];

    if (startFresh) {
      setTraversalOrder([]);
      setQueue([]);

      // Calculate in-degrees
      for (let u = 0; u < numNodes; u++) {
        for (const v of graph[u]) {
          inDegree[v]++;
        }
      }

      // Add all nodes with in-degree 0 to the queue
      for (let i = 0; i < numNodes; i++) {
        if (inDegree[i] === 0) {
          nodesToProcess.push(i);
        }
      }
    }

    setQueue([...nodesToProcess]);

    while (nodesToProcess.length > 0) {
      if (stopRef.current) {
        setTraversalNodes([...nodesToProcess]);
        setCurrentResult([...result]);
        setInDegrees([...inDegree]);
        setIsTraversing(false);
        return;
      }

      const node = nodesToProcess.shift();
      result.push(node);
      setTraversalOrder([...result]);
      setLastHighlightedNode(node);
      drawGraph(graph, positions, node);

      // Decrease in-degree of neighbors
      for (const neighbor of graph[node]) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          nodesToProcess.push(neighbor);
        }
      }

      setQueue([...nodesToProcess]);

      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }

    // Check for cycles
    if (result.length !== numNodes) {
      setTraversalOrder(['Cycle detected! Topological sort not possible.']);
    }

    setIsTraversing(false);
    setQueue([]);
    setTraversalNodes([]);
    setCurrentResult([]);
    setVisitedState([]);
    setInDegrees([]);
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
    } else if (algorithm === 'topological-sort') {
      runTopologicalSort(!shouldResume);
    }
  };

  // Stop the traversal
  const stopTraversalHandler = () => {
    stopRef.current = true;
  };

  // Reset graph
  const resetGraph = () => {
    const newGraph = generateGraph();
    const newPositions = positionNodes(newGraph);
    setGraph(newGraph);
    setPositions(newPositions);
    setTraversalOrder([]);
    setQueue([]);
    setTraversalNodes([]);
    setCurrentResult([]);
    setVisitedState([]);
    setInDegrees([]);
    setLastHighlightedNode(null);
    stopRef.current = false;
    setIsTraversing(false);
  };

  useEffect(() => {
    resetGraph();
  }, [algorithm]); // Regenerate graph when algorithm changes

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
        {(algorithm === 'bfs-graph' || algorithm === 'topological-sort') && queue.length > 0 && <p>Queue: [{queue.join(', ')}]</p>}
        {traversalOrder.length > 0 && <p>{algorithm === 'topological-sort' ? 'Topological Order: [' : 'Traversal Order: ['}{traversalOrder.join(', ')}]</p>}
      </div>
    </div>
  );
}

export default GraphViz;