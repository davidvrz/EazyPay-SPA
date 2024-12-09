import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('login');  // Initial view is login

  // Change current view
  const changeView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      < Navbar />
      {/* Show Login, Register or Dashboard view */}
      {currentView === 'login' && <Login changeView={changeView} />}
      {currentView === 'register' && <Register changeView={changeView} />}
      {currentView === 'dashboard' && <Dashboard />}
      < Footer />
    </div>
  );
}

export default App;
