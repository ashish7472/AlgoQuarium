import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Visualization from './pages/Visualization';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-transparent text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/visualization/:algo" element={<Visualization />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;