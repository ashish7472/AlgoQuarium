import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Visualization from './pages/Visualization';
import ContactMe from './pages/ContactMe';
import Testimonials from './pages/Testimonials';
import OtherWork from './pages/OtherWork';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#1e2a44] to-[#2c3e50] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/visualization/:algo" element={<Visualization />} />
          <Route path="/contact-me" element={<ContactMe />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/other-work" element={<OtherWork />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;