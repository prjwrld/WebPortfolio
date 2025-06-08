import React from 'react';
import '../styles/components.css';

const Contact = () => {
  return (
    <section id="contact">
      <div className="glass-card">
        <h2 className="section-title">Prajwal Prasad</h2>
        <p className="tagline">I'll be using this site to update my latest projects and research I'm working on. Thanks for visiting :)</p>
        <div className="logo-container">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="logo-placeholder">
              <div className="glossy-overlay"></div>
              <div className="glow-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;