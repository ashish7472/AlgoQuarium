import { useEffect, useRef, useState } from 'react';

function SearchViz({ algorithm }) {
  const canvasRef = useRef(null);
  const stopRef = useRef(false);
  const [array, setArray] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(245);
  const [target, setTarget] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1); // Current element being checked
  const [searchRange, setSearchRange] = useState({ left: -1, right: -1 }); // For Binary Search
  const [searchResult, setSearchResult] = useState(''); // Result message
  const [currentState, setCurrentState] = useState({ index: -1, left: -1, right: -1 }); // For stop/resume

  const canvasWidth = 800;
  const canvasHeight = 200;
  const arrayLength = 15;
  const boxWidth = canvasWidth / (arrayLength + 1);
  const boxHeight = 40;

  // Generate a random array (sorted for Binary Search)
  const generateArray = () => {
    const newArray = Array.from({ length: arrayLength }, () => Math.floor(Math.random() * 100));
    if (algorithm === 'binary-search') {
      newArray.sort((a, b) => a - b); // Sort for Binary Search
    }
    setArray(newArray);
    setCurrentIndex(-1);
    setSearchRange({ left: -1, right: -1 });
    setSearchResult('');
    stopRef.current = false;
    setIsSearching(false);
  };

  // Draw the array on canvas
  const drawArray = (arr, currentIdx = -1, range = { left: -1, right: -1 }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#1e2a44');
    gradient.addColorStop(1, '#2c3e50');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw array elements as boxes
    arr.forEach((num, idx) => {
      const x = idx * boxWidth + boxWidth / 2;
      const y = canvasHeight / 2 - boxHeight / 2;

      // Highlight search range for Binary Search
      if (algorithm === 'binary-search' && idx >= range.left && idx <= range.right) {
        ctx.fillStyle = '#4a4e69';
        ctx.fillRect(x, y, boxWidth - 2, boxHeight);
      }

      // Draw box
      ctx.beginPath();
      ctx.rect(x, y, boxWidth - 2, boxHeight);
      ctx.fillStyle = idx === currentIdx ? '#4a90e2' : '#b0b8c4';
      ctx.fill();
      ctx.strokeStyle = '#3b4a6b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw number
      ctx.font = '14px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(num.toString(), x + (boxWidth - 2) / 2, y + boxHeight / 2);
    });
  };

  // Calculate delay from speed
  const getDelayFromSpeed = (speedValue) => {
    const minDelay = 100;
    const maxDelay = 2000;
    return maxDelay - ((speedValue - 10) * (maxDelay - minDelay)) / (500 - 10);
  };

  // Linear Search implementation
  const runLinearSearch = async (startFresh = true) => {
    if (!array.length || !target) return;

    const targetNum = parseInt(target);
    if (isNaN(targetNum)) {
      setSearchResult('Please enter a valid number.');
      return;
    }

    setIsSearching(true);
    stopRef.current = false;

    let i = startFresh ? 0 : currentState.index;

    for (; i < array.length; i++) {
      if (stopRef.current) {
        setCurrentState({ index: i, left: -1, right: -1 });
        setIsSearching(false);
        return;
      }

      setCurrentIndex(i);
      drawArray(array, i);

      if (array[i] === targetNum) {
        setSearchResult(`Target ${targetNum} found at index ${i}`);
        setIsSearching(false);
        setCurrentIndex(-1);
        drawArray(array);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }

    setSearchResult(`Target ${targetNum} not found`);
    setIsSearching(false);
    setCurrentIndex(-1);
    drawArray(array);
  };

  // Binary Search implementation
  const runBinarySearch = async (startFresh = true) => {
    if (!array.length || !target) return;

    const targetNum = parseInt(target);
    if (isNaN(targetNum)) {
      setSearchResult('Please enter a valid number.');
      return;
    }

    setIsSearching(true);
    stopRef.current = false;

    let left = startFresh ? 0 : currentState.left;
    let right = startFresh ? array.length - 1 : currentState.right;

    while (left <= right) {
      if (stopRef.current) {
        setCurrentState({ index: -1, left, right });
        setSearchRange({ left, right });
        setIsSearching(false);
        return;
      }

      const mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      setSearchRange({ left, right });
      drawArray(array, mid, { left, right });

      if (array[mid] === targetNum) {
        setSearchResult(`Target ${targetNum} found at index ${mid}`);
        setIsSearching(false);
        setCurrentIndex(-1);
        setSearchRange({ left: -1, right: -1 });
        drawArray(array);
        return;
      } else if (array[mid] < targetNum) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }

      await new Promise((resolve) => setTimeout(resolve, getDelayFromSpeed(speed)));
    }

    setSearchResult(`Target ${targetNum} not found`);
    setIsSearching(false);
    setCurrentIndex(-1);
    setSearchRange({ left: -1, right: -1 });
    drawArray(array);
  };

  // Start or resume search based on algorithm
  const startOrResumeSearch = () => {
    const shouldResume = currentState.index !== -1 || (currentState.left !== -1 && currentState.right !== -1);
    if (algorithm === 'linear-search') {
      runLinearSearch(!shouldResume);
    } else if (algorithm === 'binary-search') {
      runBinarySearch(!shouldResume);
    }
  };

  // Stop the search
  const stopSearchHandler = () => {
    stopRef.current = true;
  };

  // Reset array
  const resetArray = () => {
    generateArray();
  };

  useEffect(() => {
    resetArray();
  }, [algorithm]);

  useEffect(() => {
    if (array.length) {
      drawArray(array, currentIndex, searchRange);
    }
  }, [array, currentIndex, searchRange]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="border border-[#3b4a6b] mb-4 rounded-lg shadow-md" />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <div>
          <label className="block mb-1 text-[#b0b8c4] text-sm md:text-base">Target Value:</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={isSearching}
            className="px-2 py-1 bg-[#2c3e50] text-white rounded-lg border border-[#3b4a6b] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] w-24"
            placeholder="Enter number"
          />
        </div>
        <button
          onClick={resetArray}
          disabled={isSearching}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          Reset Array
        </button>
        <button
          onClick={startOrResumeSearch}
          disabled={isSearching || !target}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          Start Search
        </button>
        <button
          onClick={stopSearchHandler}
          disabled={!isSearching}
          className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          Stop Search
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
            disabled={isSearching}
            className="w-40 accent-[#4a90e2]"
          />
        </div>
      </div>
      <div className="text-[#b0b8c4] text-sm md:text-base">
        {searchResult && <p>{searchResult}</p>}
      </div>
    </div>
  );
}

export default SearchViz;