import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('login');  // Initial view is login

  // Change current view
  const changeView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {/* Show Login, Register or Dashboard view */}
      {currentView === 'login' && <Login changeView={changeView} />}
      {currentView === 'register' && <Register changeView={changeView} />}
      {currentView === 'dashboard' && <Dashboard />}
    </div>
  );
}

export default App;
