import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DataEntryPage from './components/DataEntry';
import Portfolio from './components/Portfolio';
import './styles/App.css';  // Import App.css

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Handle data submission from DataEntryPage
  const handleGeneratePortfolio = (data) => {
    setPortfolioData(data);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Handle project reordering
  const handleReorderProjects = (updatedProjects) => {
    setPortfolioData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const socialLinks = portfolioData?.socialMedia || [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' }
  ];

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle">
          <button onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Routes */}
        <div className="content">
          <Routes>
            {/* Data Entry Page */}
            <Route path="/" element={<DataEntryPage onGenerate={handleGeneratePortfolio} />} />

            {/* Hero Section */}
            <Route path="/hero" element={<Hero name={portfolioData?.name} bio={portfolioData?.bio} />} />

            {/* About Me Section */}
            <Route path="/about"
              element={
                <AboutMe
                  profilePicture={portfolioData?.profilePicture}
                  skills={portfolioData?.skills ? portfolioData.skills.split(',').map(skill => skill.trim()) : []}
                  interests={portfolioData?.interests ? portfolioData.interests.split(',').map(interest => interest.trim()) : []}
                  bio={portfolioData?.aboutMe}
                />
              }
            />

            {/* Projects Section */}
            <Route
              path="/projects"
              element={
                <Projects
                  key={portfolioData?.projects?.length}  // Force re-render to fix draggable cards
                  projects={portfolioData?.projects || []}
                  onReorderProjects={handleReorderProjects}
                />
              }
            />

            {/* Contact Section */}
            <Route path="/contact" element={<ContactSection />} />

            {/* Portfolio Page */}
            <Route path="/portfolio" element={<Portfolio data={portfolioData} />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer socialLinks={socialLinks} />
      </div>
    </Router>
  );
}

export default App;
