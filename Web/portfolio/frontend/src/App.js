import React, { useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import './styles/global.css';
import './styles/animations.css';

function App() {
  const homeRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Only run on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      // Scroll to home section on initial load
      const scrollToHome = () => {
        // Only scroll if we're at the top of the page
        if (homeRef.current && window.scrollY === 0) {
          // Use setTimeout to ensure DOM is fully rendered
          setTimeout(() => {
            homeRef.current.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            // Scroll slightly up to account for fixed header
            window.scrollBy(0, -80);
          }, 100);
        }
      };
      
      // Only add the load event listener if we're at the top of the page
      if (window.scrollY === 0) {
        scrollToHome();
        window.addEventListener('load', scrollToHome);
      }
      
      return () => {
        window.removeEventListener('load', scrollToHome);
      };
    }
  }, []);

  return (
    <div className="App">
      <AnimatedBackground />
      <Navigation />
      <div id="home" ref={homeRef}><Hero /></div>
      <div id="about"><About /></div>
      <div id="resume"><Resume /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
}

export default App;