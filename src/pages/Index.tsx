
import React, { useState } from 'react';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-voice-purple-light via-background to-voice-yellow-light">
      {!isLoggedIn ? (
        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Index;
