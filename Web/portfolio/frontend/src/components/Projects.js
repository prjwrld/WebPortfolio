import React from 'react';
import '../styles/components.css';

const Projects = () => {
  // Random tech logos from techcrunch.com API
  const techLogos = [
    'https://techcrunch.com/wp-content/uploads/2015/02/screen-shot-2015-02-04-at-2-47-10-pm.png',
    'https://techcrunch.com/wp-content/uploads/2015/11/facebook-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/10/screen-shot-2015-10-04-at-4-20-16-pm.png',
    'https://techcrunch.com/wp-content/uploads/2015/09/amazon-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/07/uber-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/04/twitter-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/06/linkedin-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/08/netflix-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/05/airbnb-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/03/spotify-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/01/slack-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/12/salesforce-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/11/adobe-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/10/intel-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/09/ibm-logo.png',
    'https://techcrunch.com/wp-content/uploads/2015/08/oracle-logo.png'
  ];

  // Select 8 random logos
  const getRandomLogos = (count) => {
    const shuffled = [...techLogos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((src, i) => ({
      id: i + 1,
      alt: `Tech Logo ${i + 1}`,
      src: src
    }));
  };

  const logos = getRandomLogos(8);

  // Duplicate the logos array to create a seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section id="projects">
      <div className="glass-card">
        <div className="marquee-container">
          <div className="marquee-track">
            {duplicatedLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="marquee-item">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;