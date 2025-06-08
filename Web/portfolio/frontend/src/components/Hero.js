import React from 'react';
import ChatInterface from './ChatInterface';
import Typewriter from '../utils/typewriter';
import '../styles/components.css';

const Hero = () => {
  return (
    <section id="home">
      <div className="hero-content">
        <h1 className="hero-title">I Love working</h1>
        <p className="hero-subtitle" style={{ marginTop: '0' }}>With&nbsp;</p>
        <p className="hero-subtitle" style={{ marginTop: '0' }}>
          <Typewriter 
            roles={[
              'AI Engineering',
              'Natural Language Processing(NLP)',
              'Computer Vision',
              'AI powered SWE',
              'Vibe coding',
              'Data Structure and Algorithm',
              'Agentic AI',
              'DevOps'
            ]}
          />
        </p>
        <p className="hero-description" style={{ marginTop: '20px' }}>
          <span className="headline-text">MS in </span><span className="ai-highlight">Artificial Intelligence</span><span className="headline-text"> @ </span><span className="rit-highlight">Rochester Institute of Technology</span><br />
          <span className="headline-text">Actively looking for Full Time Opportunities</span>
        </p>
        <ChatInterface />
      </div>
    </section>
  );
};

export default Hero;