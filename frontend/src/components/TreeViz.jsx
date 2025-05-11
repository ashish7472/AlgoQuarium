import { useEffect, useRef, useState } from 'react';

function TreeViz({ algorithm }) {
  const canvasRef = useRef(null);
  const stopRef = useRef(false); // To control stopping the loop
  const [tree, setTree] = useState(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const [speed, setSpeed] = useState(245);
  const [depth, setDepth] = useState(3);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [queue, setQueue] = useState([]);
  const [bfsQueue, setBfsQueue] = useState([]); // Store BFS queue for resuming
  const [currentResult, setCurrentResult] = useState([]); // Store traversal order for resuming
  const [lastHighlightedNode, setLastHighlightedNode] = useState(null); // Store last highlighted node

  const canvasWidth = 800;
  const canvasHeight = 400;
  const nodeRadius = 20;

  // Tree Node class
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
      this.x = 0; // For canvas positioning
      this.y = 0;
    }
  }

  // Generate a random binary tree
  const generateTree = (maxDepth) => {
    const rootVal = Math.floor(Math.random() * 90) + 10; // 10 to 99
    const root = new TreeNode(rootVal);

    const buildTree = (node, currentDepth) => {
      if (currentDepth >= maxDepth) return;

      const hasLeft = Math.random() > 0.3;
      const hasRight = Math.random() > 0.3;

      if (hasLeft) {
        node.left = new TreeNode(Math.floor(Math.random() * 90) + 10);
        buildTree(node.left, currentDepth + 1);
      }
      if (hasRight) {
        node.right = new TreeNode(Math.floor(Math.random() * 90) + 10);
        buildTree(node.right, currentDepth + 1);
      }
    };

    buildTree(root, 0);
    return root;
  };

  // Position nodes for visualization
  const positionNodes = (root, canvasWidth) => {
    if (!root) return;

    const levels = [];
    const queue = [{ node: root, depth: 0 }];

    while (queue.length > 0) {
      const { node, depth } = queue.shift();
      if (!levels[depth]) levels[depth] = [];
      levels[depth].push(node);

      if (node.left) queue.push({ node: node.left, depth: depth + 1 });
      if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }

    const maxLevelHeight = nodeRadius * 4;
    const maxLevelWidth = canvasWidth / (levels.length + 1);

    levels.forEach((level, depth) => {
      const nodesInLevel = level.length;
      const levelWidth = canvasWidth / (nodesInLevel + 1);
      level.forEach((node, idx) => {
        node.x = (idx + 1) * levelWidth;
        node.y = depth * maxLevelHeight + nodeRadius * 2;
      });
    });
  };

  // Draw the tree on canvas
  const drawTree = (root, highlightedNode = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#1e2a44');
    gradient.addColorStop(1, '#2c3e50');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (!root) return;

    const queue = [root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.strokeStyle = '#b0b8c4';
        ctx.lineWidth = 2;
        ctx.stroke();
        queue.push(node.left);
      }
      if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.strokeStyle = '#b0b8c4';
        ctx.lineWidth = 2;
        ctx.stroke();
        queue.push(node.right);
      }
    }

    const drawNodes = (node) => {
      if (!node) return;

      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = node === highlightedNode ? '#4a90e2' : '#b0b8c4';
      ctx.fill();
      ctx.strokeStyle = '#3b4a6b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '14px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.val.toString(), node.x, node.y);

      drawNodes(node.left);
      drawNodes(node.right);
    };

    drawNodes(root);
  };

  // Calculate delay from speed
  const getDelayFromSpeed = (speedValue) => {
    const minDelay = 100;
    const maxDelay = 2000;
    return maxDelay - ((speedValue - 10) * (maxDelay - minDelay)) / (500 - 10);
  };

  // BFS implementation with visualization and stop
  const runBfs = async (startFresh = true) => {
    if (!tree) return;

    setIsTraversing(true);
    stopRef.current = false;

    let q = startFresh ? [tree] : [...bfsQueue]; // Use stored queue if resuming
    let result = startFresh ? [] : [...currentResult]; // Use stored result if resuming

    if (startFresh) {
      setTraversalOrder([]);
      setQueue([]);
    }

    setQueue([...q.map(node => node.val)]);

    while (q.length > 0) {
      if (stopRef.current) {
        setBfsQueue([...q]); // Store the current queue for resuming
        setCurrentResult([...result]); // Store the current result for resuming
        setIsTraversing(false);
        return;
      }

      const node = q.shift();
      result.push(node.val);
      setTraversalOrder([...result]);
      setLastHighlightedNode(node); // Store the last highlighted node
      drawTree(tree, node);
      setQueue([...q.map(n => n.val)]);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);

      if (node.left || node.right) {
        setQueue([...q.map(n => n.val)]);
      }

      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }

    setIsTraversing(false);
    setQueue([]);
    setBfsQueue([]); // Clear stored queue
    setCurrentResult([]); // Clear stored result
    setLastHighlightedNode(null); // Clear highlighted node
    drawTree(tree); // Clear highlight if traversal completed naturally
  };

  // Start or resume traversal
  const startOrResumeTraversal = () => {
    const shouldResume = bfsQueue.length > 0; // Check if there's a paused traversal
    runBfs(!shouldResume); // Start fresh if no paused traversal, otherwise resume
  };

  // Stop the traversal
  const stopTraversalHandler = () => {
    stopRef.current = true;
  };

  // Reset tree
  const resetTree = () => {
    const newTree = generateTree(depth);
    positionNodes(newTree, canvasWidth);
    setTree(newTree);
    setTraversalOrder([]);
    setQueue([]);
    setBfsQueue([]);
    setCurrentResult([]);
    setLastHighlightedNode(null);
    stopRef.current = false;
    setIsTraversing(false); // Ensure traversal is stopped
  };

  useEffect(() => {
    resetTree();
  }, [depth]);

  useEffect(() => {
    if (tree && !isTraversing) {
      drawTree(tree, lastHighlightedNode); // Redraw with last highlighted node if stopped
    }
  }, [tree, lastHighlightedNode]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="border border-[#3b4a6b] mb-4 rounded-lg shadow-md" />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <button
          onClick={resetTree}
          disabled={isTraversing}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          Reset Tree
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
        <div>
          <label className="block mb-1 text-[#b0b8c4] text-sm md:text-base">Tree Depth:</label>
          <input
            type="range"
            min="2"
            max="4"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            disabled={isTraversing}
            className="w-40 accent-[#4a90e2]"
          />
        </div>
      </div>
      <div className="text-[#b0b8c4] text-sm md:text-base">
        {queue.length > 0 && <p>Queue: [{queue.join(', ')}]</p>}
        {traversalOrder.length > 0 && <p>Traversal Order: [{traversalOrder.join(', ')}]</p>}
      </div>
    </div>
  );
}

export default TreeViz;