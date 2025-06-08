import React, { useState, useRef, useEffect } from 'react';
import chatService from '../services/chatService';
import '../styles/chat.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '👋 Hi! I\'m Prajwal\'s AI assistant. Ask me about his projects, skills, experience, or anything else you\'d like to know!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      // Use the messages container's scrollTop instead of scrollIntoView
      const messagesContainer = messagesEndRef.current.closest('.chat-messages');
      if (messagesContainer) {
        if (smooth) {
          messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
          });
        } else {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }
    }
  };

  // Only scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    // Prevent default form submission behavior that might cause scrolling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      // Scroll to bottom immediately after adding user message
      setTimeout(() => scrollToBottom(), 50);
      return newMessages;
    });
    setHasUserSentMessage(true);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(input);
      
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => {
          const newMessages = [...prev, aiMessage];
          // Scroll to bottom after AI response is added
          setTimeout(() => scrollToBottom(), 50);
          return newMessages;
        });
        setIsTyping(false);
      }, 800 + Math.random() * 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (text, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setInput(text);
    handleSend(e);
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-interface">
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="ai-avatar">
              🤖
              <div className="ai-status"></div>
            </div>
            <div className="chat-header-info">
              <h4>AI Assistant</h4>
              <p>Ask me about Prajwal's portfolio</p>
            </div>
          </div>
          <div className="chat-actions">
            <button 
              className="chat-action-btn" 
              onClick={() => {
                setMessages([messages[0]]);
                setHasUserSentMessage(false);
                setShowQuickReplies(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {!hasUserSentMessage && (
          <>
            <div className="quick-replies-toggle" onClick={() => setShowQuickReplies(!showQuickReplies)}>
              <span>{showQuickReplies ? 'Hide suggestions' : 'Show suggestions'}</span>
            </div>
            {showQuickReplies && <QuickReplies onQuickReply={handleQuickReply} />}
          </>
        )}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // Auto-resize the textarea
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSend(e);
                }
              }}
              placeholder="Ask about my AI projects..."
              rows="1"
            />
          </div>
          <button 
            className="chat-send" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSend(e);
            }}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            type="button"
          >
            <svg viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Convert markdown links to HTML
const renderContentWithLinks = (content) => {
  // Handle markdown links [text](url)
  const withLinks = content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g, 
    (match, text, url) => {
      // Check if it's an email link
      if (url.startsWith('mailto:')) {
        return `<a href="${url}" class="chat-link">${text}</a>`;
      }
      // Open external links in new tab
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${text}</a>`;
    }
  );
  
  // Convert newlines to <br> for proper line breaks
  return withLinks.split('\n').map((paragraph, i) => (
    <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
  ));
};

const Message = ({ message }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${message.type}`}>
      <div className="message-avatar">
        {message.type === 'user' ? '👤' : '🤖'}
      </div>
      <div className="message-wrapper">
        <div className="message-content">
          {renderContentWithLinks(message.content)}
        </div>
        <div className="message-time">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="typing-message">
    <div className="message-avatar">🤖</div>
    <div className="typing-content">
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="typing-text">typing...</span>
    </div>
  </div>
);

const QuickReplies = ({ onQuickReply }) => {
  const quickReplies = [
    "Tell me about projects",
    "What are your skills?",
    "Work experience",
    "Contact info"
  ];

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="quick-replies">
      {quickReplies.map(reply => (
        <button
          key={reply}
          className="quick-reply-btn"
          onClick={(e) => onQuickReply(reply, e)}
          type="button"
        >
          {isMobile && reply.length > 15 ? reply.substring(0, 15) + '...' : reply}
        </button>
      ))}
    </div>
  );
};

export default ChatInterface;