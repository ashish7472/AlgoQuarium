import { useEffect, useRef, useState } from 'react';

function SortViz({ algorithm }) {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(20);

  const canvasWidth = 800;
  const canvasHeight = 400;

  // Initialize array
  const resetArray = () => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * (canvasHeight - 50) + 10));
    setArray(newArray);
  };

  useEffect(() => {
    resetArray();
  }, [size]);

  // Draw array on canvas
  const drawArray = (arr, highlightIndices = []) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Set canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const barWidth = canvasWidth / arr.length;
    arr.forEach((value, idx) => {
      ctx.fillStyle = highlightIndices.includes(idx) ? '#4a90e2' : '#b0b8c4';
      ctx.fillRect(idx * barWidth, canvasHeight - value, barWidth - 2, value);
    });
  };

  // Bubble Sort implementation
  const bubbleSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          drawArray(arr, [j, j + 1]);
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
    }
    setIsSorting(false);
    drawArray(arr);
  };

  useEffect(() => {
    drawArray(array);
  }, [array]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="border border-[#3b4a6b] bg-white mb-4 rounded-lg shadow-md"></canvas>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md"
        >
          Reset Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={isSorting}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md"
        >
          Start Sorting
        </button>
      </div>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-1 text-[#b0b8c4]">Speed (ms):</label>
          <input
            type="range"
            min="10"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
            className="w-40 accent-[#4a90e2]"
          />
        </div>
        <div>
          <label className="block mb-1 text-[#b0b8c4]">Array Size:</label>
          <input
            type="range"
            min="10"
            max="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={isSorting}
            className="w-40 accent-[#4a90e2]"
          />
        </div>
      </div>
    </div>
  );
}

export default SortViz;