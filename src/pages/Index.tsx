
import React, { useState } from 'react';
import AuthModal from '@/components/AuthModal';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (type: 'login' | 'signup') => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-voice-purple-light via-background to-voice-yellow-light">
      {/* Navigation Bar */}
      <nav className="bg-white bg-opacity-90 shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z" 
              stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10V12C19 16.4183 15.4183 20 11 20M5 10V12C5 16.4183 8.58172 20 13 20M12 20V23" 
              stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-voice-purple-dark text-xl font-bold">Voice Attendance</h1>
        </div>
        
        {!isLoggedIn ? (
          <div className="flex gap-2">
            <button 
              onClick={() => handleAuthClick('login')}
              className="text-voice-purple hover:text-voice-purple-dark transition-colors"
            >
              Login
            </button>
            <span className="text-gray-400">|</span>
            <button 
              onClick={() => handleAuthClick('signup')}
              className="text-voice-purple hover:text-voice-purple-dark transition-colors"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-voice-purple hover:text-voice-purple-dark transition-colors"
          >
            Logout
          </button>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {!isLoggedIn ? (
          <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
            <h2 className="text-2xl font-bold text-voice-purple-dark mb-4">Welcome to Voice Attendance</h2>
            <p className="mb-6 text-gray-600">Login to start taking voice-based attendance for your class.</p>
            <button 
              onClick={() => handleAuthClick('login')} 
              className="w-full attendance-gradient text-white py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        ) : (
          <Dashboard />
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          authType={authType}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowAuthModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;
