import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import { MainApp } from './components/MainApp';

type ViewState = 'landing' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  // Simple "router"
  const handleStart = () => setView('app');

  // For now, Sign In also goes to app, or we could add a modal later
  const handleSignIn = () => setView('app');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStart={handleStart} onSignIn={handleSignIn} />
      ) : (
        <div className="animate-fade-in">
          {/* Back button or header modification could go here, 
                 but for now we just render the main app */}
          <MainApp />
        </div>
      )}
    </>
  );
};

export default App;
