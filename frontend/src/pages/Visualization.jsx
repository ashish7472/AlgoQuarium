import { useParams } from 'react-router-dom';
import SearchViz from '../components/SearchViz';
import SortViz from '../components/SortViz';
import TreeViz from '../components/TreeViz';
import GraphViz from '../components/GraphViz';
import CodeBlock from '../components/CodeBlock';

function Visualization() {
  const { algo } = useParams();

  const algorithmDetails = {

    // Searching Algorithms
    'linear-search': {
      title: 'Linear Search',
      description: 'A simple search algorithm that checks every element in the list until the target is found or the list ends.',
      complexity: 'Time: O(n), Space: O(1)',
      code: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Target found
        }
    }
    return -1; // Target not found
}`
    },
    'binary-search': {
      title: 'Binary Search',
      description: 'An efficient search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
      complexity: 'Time: O(log n), Space: O(1)',
      code: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // Avoids overflow
        if (arr[mid] == target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }
    return -1; // Target not found
}`
    },

    // Sorting Algorithms
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

    // Tree Algorithms
    'bfs-tree': {
      title: 'Breadth-First Search (BFS)',
      description: 'A tree traversal algorithm that explores all nodes at the current depth before moving to the next depth level.',
      complexity: 'Time: O(V + E), Space: O(V), where V is the number of vertices and E is the number of edges',
      code: `vector<int> bfs(TreeNode* root) {
    if (!root) return {};
    
    vector<int> result;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        result.push_back(node->val);
        
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    return result;
}`
    },
    'preorder-traversal': {
      title: 'Pre-order Traversal - DFS',
      description: 'A depth-first traversal method where the root node is processed first, followed by the left subtree, then the right subtree.',
      complexity: 'Time: O(n), Space: O(h), where n is the number of nodes and h is the height of the tree',
      code: `void preorder(TreeNode* root) {
    if (root){
      cout<<root->val<<" ";
      preorder(root->left);  
      preorder(root->right);
    }
}`
    },
    'inorder-traversal': {
      title: 'In-order Traversal - DFS',
      description: 'A depth-first traversal method where the left subtree is processed first, then the root node, and finally the right subtree.',
      complexity: 'Time: O(n), Space: O(h), where n is the number of nodes and h is the height of the tree',
      code: `void inorder(TreeNode* root) {
    if (root){
      inorder(root->left);
      cout<<root->val<<" ";
      inorder(root->right);
    }
}`
    },
    'postorder-traversal': {
      title: 'Post-order Traversal - DFS',
      description: 'A depth-first traversal method where the left subtree is processed first, then the right subtree, and finally the root node.',
      complexity: 'Time: O(n), Space: O(h), where n is the number of nodes and h is the height of the tree',
      code: `void postorder(TreeNode* root) {
    if (root){
      postorder(root->left);
      postorder(root->right);
      cout<<root->val<<" ";
    }
}`
    },

    // Graph Algorithms
    'bfs-graph': {
      title: 'Breadth-First Search (BFS) for Graph',
      description: 'A graph traversal algorithm that explores all vertices at the present depth prior to moving on to the vertices at the next depth level.',
      complexity: 'Time: O(V + E), Space: O(V), where V is the number of vertices and E is the number of edges',
      code: `vector<int> bfsGraph(Graph& graph, int start) {
    vector<int> result;
    vector<bool> visited(graph.size(), false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    return result;
}`
    },
    'dfs-graph': {
      title: 'Depth-First Search (DFS) for Graph',
      description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
      complexity: 'Time: O(V + E), Space: O(V), where V is the number of vertices and E is the number of edges',
      code: `void dfsGraph(Graph& graph, int node, vector<bool>& visited, vector<int>& result) {
    visited[node] = true;
    result.push_back(node);
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfsGraph(graph, neighbor, visited, result);
        }
    }
}
vector<int> dfs(Graph& graph, int start) {
    vector<bool> visited(graph.size(), false);
    vector<int> result;
    dfsGraph(graph, start, visited, result);
    
    return result;
}`
    },
    'topological-sort': {
      title: 'Topological Sort',
      description: 'A linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge u -> v, vertex u comes before v in the ordering.',
      complexity: 'Time: O(V + E), Space: O(V), where V is the number of vertices and E is the number of edges',
      code: `vector<int> topologicalSort(Graph& graph) {
    vector<int> inDegree(graph.size(), 0);
    for (const auto& edges : graph) {
        for (int neighbor : edges) {
            inDegree[neighbor]++;
        }
    }
    queue<int> q;
    for (int i = 0; i < graph.size(); i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }
    vector<int> result;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        for (int neighbor : graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    return result;
}`
    },
    // Dijkstra's Algorithm - Shortest Path in Graph
    'dijkstra': {
      title: 'Dijkstra\'s Algorithm',
      description: 'An algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.',
      complexity: 'Time: O((V + E) log V), Space: O(V), where V is the number of vertices and E is the number of edges',
      code: `vector<int> dijkstra(Graph& graph, int start) {
    vector<int> dist(graph.size(), INT_MAX);
    dist[start] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    while (!pq.empty()) {
        int d = pq.top().first;
        int node = pq.top().second;
        pq.pop();
        
        if (d > dist[node]) continue;
        
        for (int neighbor : graph[node]) {
            int newDist = d + 1; // Assuming all edges have weight 1
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push({newDist, neighbor});
            }
        }
    }
    return dist;
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
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 text-white">{details.title}</h1>
      <div className="bg-[#2c3e50] rounded-lg shadow-lg p-4 md:p-6 mb-6 max-w-3xl mx-auto border border-[#3b4a6b]">
        <p className="text-[#b0b8c4] mb-2 text-sm md:text-base">{details.description}</p>
        <p className="text-[#b0b8c4] text-sm md:text-base"><strong>Complexity:</strong> {details.complexity}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="md:w-3/5">
          {['linear-search', 'binary-search'].includes(algo) && <SearchViz algorithm={algo} />}

          {['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'].includes(algo) && <SortViz algorithm={algo} />}

          {['bfs-tree', 'preorder-traversal', 'inorder-traversal', 'postorder-traversal'].includes(algo) && <TreeViz algorithm={algo} />}

          {['bfs-graph', 'dfs-graph', 'topological-sort', 'dijkstra'].includes(algo) && <GraphViz algorithm={algo} />}
        </div>
        <div className="md:w-2/5">
          <CodeBlock code={details.code} />
        </div>
      </div>
    </div>
  );
}

export default Visualization;