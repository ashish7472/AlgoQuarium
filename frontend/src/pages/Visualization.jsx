import { useParams } from 'react-router-dom';
import SortViz from '../components/SortViz';
import CodeBlock from '../components/CodeBlock';

function Visualization() {
  const { algo } = useParams();

  const algorithmDetails = {
    'bubble-sort': {
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      complexity: 'Time: O(n²), Space: O(1)',
      code: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
    },
    'selection-sort': {
      title: 'Selection Sort',
      description: 'A sorting algorithm that selects the smallest element from the unsorted portion and places it at the beginning of the sorted portion.',
      complexity: 'Time: O(n²), Space: O(1)',
      code: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap elements
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`
    },
    'insertion-sort': {
      title: 'Insertion Sort',
      description: 'A sorting algorithm that builds the sorted array one element at a time by inserting each element into its correct position.',
      complexity: 'Time: O(n²), Space: O(1)',
      code: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    'merge-sort': {
      title: 'Merge Sort',
      description: 'A divide-and-conquer algorithm that splits the array into halves, sorts them recursively, and merges them back together.',
      complexity: 'Time: O(n log n), Space: O(n)',
      code: `void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int i = 0; i < n2; i++) R[i] = arr[mid + 1 + i];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`
    },
    'quick-sort': {
      title: 'Quick Sort',
      description: 'A divide-and-conquer algorithm that picks a pivot, partitions the array around it, and recursively sorts the sub-arrays.',
      complexity: 'Time: O(n log n) average, O(n²) worst, Space: O(log n)',
      code: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    },
  };

  const details = algorithmDetails[algo] || { 
    title: 'Unknown Algorithm', 
    description: 'Not found.', 
    complexity: '',
    code: '// Code not available.'
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4 text-white">{details.title}</h1>
      <div className="bg-[#2c3e50] rounded-lg shadow-lg p-6 mb-6 max-w-3xl mx-auto border border-[#3b4a6b]">
        <p className="text-[#b0b8c4] mb-2">{details.description}</p>
        <p className="text-[#b0b8c4]"><strong>Complexity:</strong> {details.complexity}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/5">
          {['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'].includes(algo) && <SortViz algorithm={algo} />}
        </div>
        <div className="md:w-2/5">
          <CodeBlock code={details.code} />
        </div>
      </div>
    </div>
  );
}

export default Visualization;