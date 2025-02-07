import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Categories from './pages/Categories';
import SavedArticles from './pages/SavedArticles';
import ThemeToggle from './components/ThemeToggle';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <AnimatedBackground />
          <div className="relative z-10">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/saved" element={<SavedArticles />} />
              </Routes>
            </main>
          </div>
          <ThemeToggle />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
