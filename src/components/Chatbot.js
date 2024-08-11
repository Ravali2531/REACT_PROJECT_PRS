import React from 'react';
import '../css/Chatbot.css'; 

const Chatbot = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <h3>Contact Us</h3>
          <button className="close-chatbot" onClick={onClose}>X</button>
        </div>
        <div className="chatbot-content">
          <button onClick={() => window.location.href = 'mailto:poojithakandru.ed@gmail.com'}>Mail Us</button>
          <button onClick={() => window.location.href = 'tel:+1234567890'}>Call Us</button>
          {/* <button onClick={() => window.location.href = '/chat'}>Chat with Us</button> */}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
