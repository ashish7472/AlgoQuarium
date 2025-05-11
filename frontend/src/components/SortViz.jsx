import { useEffect, useRef, useState } from 'react';

function SortViz({ algorithm }) {
  const canvasRef = useRef(null);
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(245);
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

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#1e2a44');
    gradient.addColorStop(1, '#2c3e50');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;

    // Vertical grid lines
    const barWidth = canvasWidth / arr.length;
    for (let x = 0; x <= canvasWidth; x += barWidth * 2) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y <= canvasHeight; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }

    // Draw bars
    arr.forEach((value, idx) => {
      ctx.fillStyle = highlightIndices.includes(idx) ? '#4a90e2' : '#b0b8c4';
      ctx.fillRect(idx * barWidth, canvasHeight - value, barWidth - 2, value);
    });
  };

  // Calculate delay from speed (inverse relationship)
  const getDelayFromSpeed = (speedValue) => {
    const minDelay = 10;
    const maxDelay = 500;
    return maxDelay - ((speedValue - 10) * (maxDelay - minDelay)) / (500 - 10);
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
          await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
        }
      }
    }
    setIsSorting(false);
    drawArray(arr);
  };

  // Selection Sort implementation
  const selectionSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        drawArray(arr, [minIdx, j]);
        await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        drawArray(arr, [i, minIdx]);
        await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
      }
    }
    setIsSorting(false);
    drawArray(arr);
  };

  // Insertion Sort implementation
  const insertionSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        drawArray(arr, [j + 1, i]);
        await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
      }
      arr[j + 1] = key;
      setArray([...arr]);
      drawArray(arr, [j + 1, i]);
      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }
    setIsSorting(false);
    drawArray(arr);
  };

  // Merge Sort implementation
  const merge = async (arr, left, mid, right) => {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = arr.slice(left, mid + 1);
    let R = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setArray([...arr]);
      drawArray(arr, [k]);
      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
      k++;
    }
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      setArray([...arr]);
      drawArray(arr, [k - 1]);
      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      setArray([...arr]);
      drawArray(arr, [k - 1]);
      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }
  };

  const mergeSort = async (arr = [...array], left = 0, right = arr.length - 1) => {
    if (left < right) {
      let mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
      setArray([...arr]);
      drawArray(arr);
    }
  };

  const mergeSortWrapper = async () => {
    setIsSorting(true);
    await mergeSort([...array], 0, array.length - 1);
    setIsSorting(false);
    drawArray(array);
  };

  // Quick Sort implementation
  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        drawArray(arr, [i, j]);
        await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    drawArray(arr, [i + 1, high]);
    await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    return i + 1;
  };

  const quickSort = async (arr = [...array], low = 0, high = arr.length - 1) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
      setArray([...arr]);
      drawArray(arr);
    }
  };

  const quickSortWrapper = async () => {
    setIsSorting(true);
    await quickSort([...array], 0, array.length - 1);
    setIsSorting(false);
    drawArray(array);
  };

  // Map algorithm to its sorting function
  const sortFunctions = {
    'bubble-sort': bubbleSort,
    'selection-sort': selectionSort,
    'insertion-sort': insertionSort,
    'merge-sort': mergeSortWrapper,
    'quick-sort': quickSortWrapper,
  };

  const startSorting = () => {
    if (sortFunctions[algorithm]) {
      sortFunctions[algorithm]();
    }
  };

  useEffect(() => {
    drawArray(array);
  }, [array]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="border border-[#3b4a6b] mb-4 rounded-lg shadow-md"></canvas>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md"
        >
          Reset Array
        </button>
        <button
          onClick={startSorting}
          disabled={isSorting}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md"
        >
          Start Sorting
        </button>
      </div>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-1 text-[#b0b8c4]">Speed:</label>
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