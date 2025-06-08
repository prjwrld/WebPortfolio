import React from 'react';
import '../styles/components.css';

const About = () => {
  return (
    <section id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-container">
        <div className="about-content">
          <div className="glass-card about-card">
            <h3 className="about-subtitle">Hi, I'm Prajwal Prasad 👋</h3>
            <p className="about-text">
              I'm a passionate <strong>Growth Engineer</strong> and <strong>AI Developer</strong> currently
              working at Nella Marketing, where I build AI agents that automate lead engagement and boost 
              conversion rates. With a strong foundation in Computer Applications from Amrita Vishwa 
              Vidyapeetham (CGPA: 8.94), I specialize in bridging the gap between cutting-edge AI 
              technology and real-world business solutions.
            </p>
            <p className="about-text">
              My journey in tech spans from web development to advanced AI systems. I've built everything 
              from <strong>RAG-powered voice assistants</strong> to <strong>ML-based prediction systems</strong>,
              always focusing on creating solutions that make a real impact. Whether it's developing an 
              AI meeting summarizer deployed on Azure or crafting predictive models with XGBoost and 
              CatBoost, I thrive on turning complex problems into elegant solutions.
            </p>
          </div>

          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-icon">🚀</div>
              <h4>5+</h4>
              <p>Years Experience</p>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-icon">💻</div>
              <h4>10+</h4>
              <p>Projects Completed</p>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-icon">🤖</div>
              <h4>AI/ML</h4>
              <p>Specialist</p>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-icon">📚</div>
              <h4>8.94</h4>
              <p>CGPA</p>
            </div>
          </div>

          <div className="glass-card interests-card">
            <h3 className="about-subtitle">What Drives Me</h3>
            <div className="interests-grid">
              <div className="interest-item">
                <span className="interest-icon">🧠</span>
                <span>LLM Fine-tuning</span>
              </div>
              <div className="interest-item">
                <span className="interest-icon">🔗</span>
                <span>RAG Systems</span>
              </div>
              <div className="interest-item">
                <span className="interest-icon">🤖</span>
                <span>Agentic AI</span>
              </div>
              <div className="interest-item">
                <span className="interest-icon">☁️</span>
                <span>Cloud Deployment</span>
              </div>
              <div className="interest-item">
                <span className="interest-icon">📊</span>
                <span>Data Science</span>
              </div>
              <div className="interest-item">
                <span className="interest-icon">🎯</span>
                <span>Growth Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;