import React, { useEffect } from 'react';
import '../styles/components.css';

const Resume = () => {

  useEffect(() => {
    const setupChartInteractions = () => {
      const legendItems = document.querySelectorAll('.legend-item');
      const chartSegments = document.querySelectorAll('.chart-segment');

      // Replace the highlightSegment function in Resume.js with this improved version:

      const highlightSegment = (segmentClass) => {
        const segment = document.querySelector(`.chart-segment.segment-${segmentClass}`);
        const legendItem = document.querySelector(`.legend-item .legend-color.${segmentClass}`)?.parentNode;

        if (segment && legendItem) {
          segment.classList.add('segment-highlighted');
          legendItem.classList.add('active');

          const percentage = segment.getAttribute('data-percentage');
          if (percentage) {
            // Create or get the percentage display
            let percentageDisplay = document.querySelector('.percentage-display');
            if (!percentageDisplay) {
              percentageDisplay = document.createElement('div');
              percentageDisplay.className = 'percentage-display';
              document.body.appendChild(percentageDisplay); // Append to body for fixed positioning
            }

            const formattedLabel = segmentClass
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .trim();

            percentageDisplay.innerHTML = `
        <div class="percentage-value">${percentage}%</div>
        <div class="percentage-label">${formattedLabel}</div>
      `;
            percentageDisplay.style.display = 'block';

            // Get segment position for tooltip positioning
            const segmentRect = segment.getBoundingClientRect();
            const segmentCenterX = segmentRect.left + segmentRect.width / 2;
            const segmentCenterY = segmentRect.top + segmentRect.height / 2;

            // Position tooltip above the segment
            const tooltipHeight = percentageDisplay.offsetHeight;
            const tooltipWidth = percentageDisplay.offsetWidth;

            percentageDisplay.style.left = `${segmentCenterX - (tooltipWidth / 2)}px`;
            percentageDisplay.style.top = `${segmentCenterY - tooltipHeight - 20}px`;
          }

          document.querySelectorAll(`.chart-segment:not(.segment-${segmentClass})`).forEach(otherSegment => {
            otherSegment.style.opacity = '0.2';
          });

          document.querySelectorAll(`.legend-item:not(:has(.legend-color.${segmentClass}))`).forEach(otherLegend => {
            otherLegend.style.opacity = '0.3';
          });
        }
      };

      const resetHighlights = () => {
        document.querySelectorAll('.chart-segment').forEach(segment => {
          segment.classList.remove('segment-highlighted');
          segment.style.opacity = '';
        });

        document.querySelectorAll('.legend-item').forEach(item => {
          item.classList.remove('active');
          item.style.opacity = '';
        });

        const percentageDisplay = document.querySelector('.percentage-display');
        if (percentageDisplay) {
          percentageDisplay.style.display = 'none';
        }
      };

      legendItems.forEach(item => {
        const colorSpan = item.querySelector('.legend-color');
        if (!colorSpan) return;

        const segmentClass = Array.from(colorSpan.classList)
          .find(cls => cls !== 'legend-color');

        if (!segmentClass) return;

        item.addEventListener('mouseenter', () => {
          resetHighlights();
          highlightSegment(segmentClass);
        });

        item.addEventListener('mouseleave', resetHighlights);

        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('focus', () => {
          resetHighlights();
          highlightSegment(segmentClass);
        });
        item.addEventListener('blur', resetHighlights);
      });

      chartSegments.forEach(segment => {
        const segmentClass = Array.from(segment.classList)
          .find(cls => cls.startsWith('segment-') && cls !== 'chart-segment')
          ?.replace('segment-', '');

        if (!segmentClass) return;

        segment.addEventListener('mouseenter', () => {
          resetHighlights();
          highlightSegment(segmentClass);
        });

        segment.addEventListener('mouseleave', resetHighlights);

        // Add ARIA labels for accessibility
        segment.setAttribute('aria-label', `${segment.getAttribute('data-label')} proficiency, ${segment.getAttribute('data-percentage')}%`);

        // Add keyboard accessibility
        segment.setAttribute('tabindex', '0');
        segment.addEventListener('focus', () => {
          resetHighlights();
          highlightSegment(segmentClass);
        });
        segment.addEventListener('blur', resetHighlights);
      });
    };

    const timer = setTimeout(() => {
      setupChartInteractions();
    }, 500);

    return () => {
      clearTimeout(timer);
      const legendItems = document.querySelectorAll('.legend-item');
      const chartSegments = document.querySelectorAll('.chart-segment');

      legendItems.forEach(item => {
        item.removeEventListener('mouseenter', () => { });
        item.removeEventListener('mouseleave', () => { });
        item.removeEventListener('focus', () => { });
        item.removeEventListener('blur', () => { });
      });

      chartSegments.forEach(segment => {
        segment.removeEventListener('mouseenter', () => { });
        segment.removeEventListener('mouseleave', () => { });
        segment.removeEventListener('focus', () => { });
        segment.removeEventListener('blur', () => { });
      });
    };
  }, []);

  return (
    <section id="resume">
      <h2 className="section-title">Resume</h2>

      <div className="resume-container">
        {/* Education */}
        <div className="glass-card resume-section">
          <h3 className="section-subtitle">🎓 Education</h3>
          <div className="education-item">
            <div className="education-header">
              <h4>Bachelor of Computer Applications</h4>
              <span className="date">May 2025</span>
            </div>
            <div className="education-details">
              <p className="institution">Amrita Vishwa Vidyapeetham, Mysuru</p>
              <p className="achievement">CGPA: <strong>8.94</strong></p>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="glass-card resume-section">
          <h3 className="section-subtitle">💼 Work Experience</h3>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h4>Growth Engineer</h4>
                <p className="company">Nella Marketing, Bangalore</p>
              </div>
              <span className="date">Mar 2025 - Present</span>
            </div>
            <ul className="experience-details">
              <li>Developed AI agents to automate lead engagement, boosting conversion rates</li>
              <li>Implemented marketing dashboards for data-driven decision-making</li>
              <li>Collaborated cross-functionally to align technical solutions with business objectives</li>
            </ul>
            <div className="skills-tags">
              <span className="skill-tag">MLOps</span>
              <span className="skill-tag">Meta Ads</span>
              <span className="skill-tag">AI Agents</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h4>Growth Engineer Intern</h4>
                <p className="company">Nella Marketing, Bangalore</p>
              </div>
              <span className="date">Dec 2024 - Feb 2025</span>
            </div>
            <ul className="experience-details">
              <li>Automated marketing workflows using tools like Zapier and integrated CRM systems with analytics platforms</li>
              <li>Analyzed user engagement data to identify growth opportunities and built dashboards using Looker Studio</li>
              <li>Utilized AI tools to personalize customer interactions and developed AI-driven chatbots</li>
            </ul>
            <div className="skills-tags">
              <span className="skill-tag">Data Analysis</span>
              <span className="skill-tag">Automation</span>
              <span className="skill-tag">AI Chatbots</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h4>Developer</h4>
                <p className="company">GDG Amrita Mysuru</p>
              </div>
              <span className="date">Sep 2024 - Present</span>
            </div>
            <ul className="experience-details">
              <li>Core team member developing projects and educating peers on computer science concepts</li>
              <li>Organized events, workshops, hackathons, and seminars to enhance coding skills</li>
              <li>Led in-campus coding challenges to learn and teach coding skills to peers</li>
            </ul>
            <div className="skills-tags">
              <span className="skill-tag">Project Management</span>
              <span className="skill-tag">Team Leadership</span>
              <span className="skill-tag">OOP</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h4>Education Volunteer</h4>
                <p className="company">Robin Hood Army</p>
              </div>
              <span className="date">Jul 2024 - Present</span>
            </div>
            <ul className="experience-details">
              <li>Organized drives to old homes and NGO schools, distributing food to the homeless in Mysore</li>
              <li>Collaborated with team members to plan and execute community outreach initiatives</li>
              <li>Engaged in hands-on volunteer work to make a positive impact on the local community</li>
            </ul>
            <div className="skills-tags">
              <span className="skill-tag">Team Leadership</span>
              <span className="skill-tag">Collaboration</span>
              <span className="skill-tag">Community Service</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h4>Account Executive</h4>
                <p className="company">Andro Consultant, Mysuru</p>
              </div>
              <span className="date">Aug 2021 - Mar 2022</span>
            </div>
            <ul className="experience-details">
              <li>Managed day-to-day accounting operations, including expense tracking and bookkeeping</li>
              <li>Maintained structured client and internal financial records for Andro Consultant LLP</li>
              <li>Supported document verification and reporting under supervision during probation</li>
            </ul>
            <div className="skills-tags">
              <span className="skill-tag">Sales</span>
              <span className="skill-tag">Records Management</span>
              <span className="skill-tag">Communication</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h4>Web Developer</h4>
                <p className="company">Godofon Events, Mysuru</p>
              </div>
              <span className="date">Jan 2020 - Jan 2022</span>
            </div>
            <ul className="experience-details">
              <li>Developed custom websites for clients using Wix and GoDaddy templates, focusing on SEO optimization</li>
              <li>Collaborated with clients to understand their requirements and deliver personalized website designs</li>
              <li>Applied color theory to match client brand identity and optimize user experience</li>
            </ul>
            <div className="skills-tags">
              <span className="skill-tag">Web Development</span>
              <span className="skill-tag">SEO</span>
              <span className="skill-tag">Client Management</span>
            </div>
          </div>
        </div>

        {/* Key Projects */}
        <div className="glass-card resume-section">
          <h3 className="section-subtitle">🚀 Key Projects</h3>

          <div className="project-item">
            <div className="project-header">
              <h4>AI Meeting Summarizer</h4>
              <span className="date">Apr 2025 - Present</span>
            </div>
            <p className="project-description">
              AI-powered web app that converts meeting audio to text using Whisper and summarizes using Hugging Face Transformers.
              Built with Flask and Bootstrap, deployed on Azure App Service with CI/CD powered by Azure DevOps.
            </p>
            <div className="skills-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Flask</span>
              <span className="skill-tag">Whisper</span>
              <span className="skill-tag">Azure</span>
              <span className="skill-tag">DevOps</span>
            </div>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h4>AI Voice Agent with RAG & TTS</h4>
              <span className="date">May 2025 - Present</span>
            </div>
            <p className="project-description">
              Real-time AI voice assistant with custom RAG pipeline. Integrated LiveKit for voice streaming,
              Whisper ASR for speech-to-text, and TTS for dynamic voice replies with context-aware responses.
            </p>
            <div className="skills-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">LiveKit</span>
              <span className="skill-tag">RAG</span>
              <span className="skill-tag">Hugging Face</span>
              <span className="skill-tag">TTS</span>
            </div>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h4>Student Enrollment Prediction</h4>
              <span className="date">Jun 2024 - Dec 2024</span>
            </div>
            <p className="project-description">
              Predictive model using XGBoost, CatBoost, and Random Forest to predict student enrollment based on admission query data.
              Led team of 4 as data analyst, achieving high accuracy in enrollment likelihood predictions.
            </p>
            <div className="skills-tags">
              <span className="skill-tag">XGBoost</span>
              <span className="skill-tag">CatBoost</span>
              <span className="skill-tag">Random Forest</span>
              <span className="skill-tag">Data Analysis</span>
              <span className="skill-tag">Team Leadership</span>
            </div>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h4>BloodLink Mobile Application</h4>
              <span className="date">Nov 2024 - Present</span>
            </div>
            <p className="project-description">
              Mobile application connecting blood donors and receivers with search filters by blood type and location.
              Features user-friendly interface for direct donor-recipient communication.
            </p>
            <div className="skills-tags">
              <span className="skill-tag">Mobile Development</span>
              <span className="skill-tag">Database Design</span>
              <span className="skill-tag">Android Studio</span>
              <span className="skill-tag">SQLite</span>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="glass-card resume-section">
          <h3 className="section-subtitle">🛠️ Technical Skills</h3>

          <div className="skills-charts-container">
            {/* First Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%', marginBottom: '20px' }}>
              {/* Programming Languages Chart */}
              <div className="skill-chart-item" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                <h4 className="chart-title">Programming Languages</h4>
                <div className="chart-wrapper">
                  <svg className="skill-chart" viewBox="0 0 200 200" width="200" height="200">
                    <g transform="translate(100,100)">
                      {/* Python - 40% (144 degrees) */}
                      <path className="chart-segment segment-python"
                        d="M 0,-80 A 80,80 0 0,1 61.44,-51.42 L 30.72,-25.71 A 40,40 0 0,0 0,-40 Z"
                        data-label="Python"
                        data-percentage="40" />
                      {/* JavaScript - 25% (90 degrees) */}
                      <path className="chart-segment segment-javascript"
                        d="M 61.44,-51.42 A 80,80 0 0,1 80,0 L 40,0 A 40,40 0 0,0 30.72,-25.71 Z"
                        data-label="JavaScript"
                        data-percentage="25" />
                      {/* Java - 20% (72 degrees) */}
                      <path className="chart-segment segment-java"
                        d="M 80,0 A 80,80 0 0,1 24.72,76.08 L 12.36,38.04 A 40,40 0 0,0 40,0 Z"
                        data-label="Java"
                        data-percentage="20" />
                      {/* C++ - 10% (36 degrees) */}
                      <path className="chart-segment segment-cpp"
                        d="M 24.72,76.08 A 80,80 0 0,1 -41.41,68.48 L -20.71,34.24 A 40,40 0 0,0 12.36,38.04 Z"
                        data-label="C++"
                        data-percentage="10" />
                      {/* C# - 3% (10.8 degrees) */}
                      <path className="chart-segment segment-csharp"
                        d="M -41.41,68.48 A 80,80 0 0,1 -56.57,56.57 L -28.28,28.28 A 40,40 0 0,0 -20.71,34.24 Z"
                        data-label="C#"
                        data-percentage="3" />
                      {/* Other - 2% (7.2 degrees) */}
                      <path className="chart-segment segment-other"
                        d="M -56.57,56.57 A 80,80 0 0,1 0,-80 L 0,-40 A 40,40 0 0,0 -28.28,28.28 Z"
                        data-label="Others"
                        data-percentage="2" />
                    </g>
                  </svg>
                  <div className="chart-legend">
                    <div className="legend-item"><span className="legend-color python"></span>Python</div>
                    <div className="legend-item"><span className="legend-color javascript"></span>JavaScript</div>
                    <div className="legend-item"><span className="legend-color java"></span>Java</div>
                    <div className="legend-item"><span className="legend-color cpp"></span>C++</div>
                    <div className="legend-item"><span className="legend-color csharp"></span>C#</div>
                    <div className="legend-item"><span className="legend-color other"></span>Others</div>
                  </div>
                </div>
              </div>

              {/* AI/ML Technologies Chart */}
              <div className="skill-chart-item" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                <h4 className="chart-title">AI/ML Technologies</h4>
                <div className="chart-wrapper">
                  <svg className="skill-chart" viewBox="0 0 200 200" width="200" height="200">
                    <g transform="translate(100,100)">
                      {/* PyTorch - 35% (126 degrees) */}
                      <path className="chart-segment segment-pytorch"
                        d="M 0,-80 A 80,80 0 0,1 77.27,-20.71 L 38.64,-10.35 A 40,40 0 0,0 0,-40 Z"
                        data-label="PyTorch"
                        data-percentage="35" />
                      {/* TensorFlow - 30% (108 degrees) */}
                      <path className="chart-segment segment-tensorflow"
                        d="M 77.27,-20.71 A 80,80 0 0,1 49.44,62.95 L 24.72,31.48 A 40,40 0 0,0 38.64,-10.35 Z"
                        data-label="TensorFlow"
                        data-percentage="30" />
                      {/* Hugging Face - 15% (54 degrees) */}
                      <path className="chart-segment segment-huggingface"
                        d="M 49.44,62.95 A 80,80 0 0,1 -24.72,76.08 L -12.36,38.04 A 40,40 0 0,0 24.72,31.48 Z"
                        data-label="Hugging Face"
                        data-percentage="15" />
                      {/* Scikit-learn - 10% (36 degrees) */}
                      <path className="chart-segment segment-sklearn"
                        d="M -24.72,76.08 A 80,80 0 0,1 -68.48,41.41 L -34.24,20.71 A 40,40 0 0,0 -12.36,38.04 Z"
                        data-label="Scikit-learn"
                        data-percentage="10" />
                      {/* OpenCV - 5% (18 degrees) */}
                      <path className="chart-segment segment-opencv"
                        d="M -68.48,41.41 A 80,80 0 0,1 -78.82,-13.83 L -39.41,-6.91 A 40,40 0 0,0 -34.24,20.71 Z"
                        data-label="OpenCV"
                        data-percentage="5" />
                      {/* Others - 5% (18 degrees) */}
                      <path className="chart-segment segment-ai-other"
                        d="M -78.82,-13.83 A 80,80 0 0,1 0,-80 L 0,-40 A 40,40 0 0,0 -39.41,-6.91 Z"
                        data-label="Others"
                        data-percentage="5" />
                    </g>
                  </svg>
                  <div className="chart-legend">
                    <div className="legend-item"><span className="legend-color pytorch"></span>PyTorch</div>
                    <div className="legend-item"><span className="legend-color tensorflow"></span>TensorFlow</div>
                    <div className="legend-item"><span className="legend-color huggingface"></span>Hugging Face</div>
                    <div className="legend-item"><span className="legend-color sklearn"></span>Scikit-learn</div>
                    <div className="legend-item"><span className="legend-color opencv"></span>OpenCV</div>
                    <div className="legend-item"><span className="legend-color ai-other"></span>Others</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-charts-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%' }}>
            {/* Backend & Cloud Chart */}
            <div className="skill-chart-item" style={{ flex: '1 1 45%', minWidth: '300px' }}>
              <h4 className="chart-title">Backend & Cloud</h4>
              <div className="chart-wrapper">
                <svg className="skill-chart" viewBox="0 0 200 200" width="200" height="200">
                  <g transform="translate(100,100)">
                    {/* Azure - 30% (108 degrees) */}
                    <path className="chart-segment segment-azure"
                      d="M 0,-80 A 80,80 0 0,1 76.08,24.72 L 38.04,12.36 A 40,40 0 0,0 0,-40 Z"
                      data-label="Azure"
                      data-percentage="30" />
                    {/* AWS - 25% (90 degrees) */}
                    <path className="chart-segment segment-aws"
                      d="M 76.08,24.72 A 80,80 0 0,1 0,80 L 0,40 A 40,40 0 0,0 38.04,12.36 Z"
                      data-label="AWS"
                      data-percentage="25" />
                    {/* GCP - 20% (72 degrees) */}
                    <path className="chart-segment segment-gcp"
                      d="M 0,80 A 80,80 0 0,1 -76.08,24.72 L -38.04,12.36 A 40,40 0 0,0 0,40 Z"
                      data-label="GCP"
                      data-percentage="20" />
                    {/* Databases - 15% (54 degrees) */}
                    <path className="chart-segment segment-databases"
                      d="M -76.08,24.72 A 80,80 0 0,1 -49.44,-62.95 L -24.72,-31.48 A 40,40 0 0,0 -38.04,12.36 Z"
                      data-label="Databases"
                      data-percentage="15" />
                    {/* Docker - 5% (18 degrees) */}
                    <path className="chart-segment segment-docker"
                      d="M -49.44,-62.95 A 80,80 0 0,1 -13.83,-78.82 L -6.91,-39.41 A 40,40 0 0,0 -24.72,-31.48 Z"
                      data-label="Docker"
                      data-percentage="5" />
                    {/* Others - 5% (18 degrees) */}
                    <path className="chart-segment segment-backend-other"
                      d="M -13.83,-78.82 A 80,80 0 0,1 0,-80 L 0,-40 A 40,40 0 0,0 -6.91,-39.41 Z"
                      data-label="Others"
                      data-percentage="5" />
                  </g>
                </svg>
                <div className="chart-legend">
                  <div className="legend-item"><span className="legend-color azure"></span>Azure</div>
                  <div className="legend-item"><span className="legend-color aws"></span>AWS</div>
                  <div className="legend-item"><span className="legend-color gcp"></span>GCP</div>
                  <div className="legend-item"><span className="legend-color databases"></span>Databases</div>
                  <div className="legend-item"><span className="legend-color docker"></span>Docker</div>
                  <div className="legend-item"><span className="legend-color backend-other"></span>Others</div>
                </div>
              </div>
            </div>

            {/* Additional Skills Tags */}
            <div className="additional-skills" style={{ flex: '1 1 45%', minWidth: '300px' }}>
              <h4 className="chart-title">Additional Technologies</h4>
              <div className="skills-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
                {['React', 'Node.js', 'MongoDB', 'MySQL', 'RAG Framework', 'Vector DB', 'LLM Fine-tuning', 'Cursor', 'Windsurf', 'VS Copilot'].map((skill, index) => (
                  <span key={index} className="skill-tag" style={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    padding: '8px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.9em',
                    backdropFilter: 'blur(5px)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
          </div>

        {/* Awards & Achievements */}
        <div className="glass-card resume-section">
          <h3 className="section-subtitle">🏆 Awards & Achievements</h3>

          <div className="achievement-item">
            <div className="achievement-icon">🏅</div>
            <div className="achievement-content">
              <h4>Developer-core team member</h4>
              <p>Coding Club, Amrita Vishwa Vidyapeetham, Mysuru (2024)</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">👥</div>
            <div className="achievement-content">
              <h4>Google Developer Group (GDG) Member</h4>
              <p>Amrita Vishwa Vidyapeetham (2024)</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">💡</div>
            <div className="achievement-content">
              <h4>Smart India Hackathon Participant</h4>
              <p>National level hackathon (2023-2024)</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">📝</div>
            <div className="achievement-content">
              <h4>Research Publication</h4>
              <p>"Automatic generation of web service composition templates using WSDL descriptions" - INDIA 2015 Conference</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">🏃</div>
            <div className="achievement-content">
              <h4>5th Place - 10km Marathon</h4>
              <p>IIFL JITO - AHIMSA Run (Mar 2024)</p>
            </div>
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="resume-download">
          <button className="download-btn" onClick={() => window.open('#', '_blank')}>
            <span className="download-icon">📄</span>
            Download Full Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resume;