import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ roles }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const cursorRef = useRef(null);
  
  // Get the current role from the roles array
  const currentRole = roles[roleIndex];
  
  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.display = 'inline-block';
    }
  }, [currentText]);
  
  // Typewriter effect
  useEffect(() => {
    const pauseTime = 1500; // Time to pause at the end of a word
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        // Deleting text
        setCurrentText(currentRole.substring(0, currentText.length - 1));
        setTypingSpeed(50); // Faster when deleting
      } else {
        // Typing text
        setCurrentText(currentRole.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }
      
      // Handle transitions between typing and deleting
      if (!isDeleting && currentText === currentRole) {
        // Finished typing, start deleting after pause
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === '') {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setTypingSpeed(100);
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRole, roleIndex, roles, typingSpeed]);
  
  return (
    <span className="typewriter-text">
      <span className="neon-gradient-text">
        {currentText}
        <span 
          ref={cursorRef}
          className="cursor" 
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            backgroundColor: 'currentColor',
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'blink 0.8s infinite'
          }}
        />
      </span>
    </span>
  );
};

export default Typewriter;