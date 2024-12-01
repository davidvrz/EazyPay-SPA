import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('login');  // Vista inicial es login

  // Función para cambiar la vista actual
  const changeView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {/* Mostrar la vista de Login, Register o Dashboard */}
      {currentView === 'login' && <Login changeView={changeView} />}
      {currentView === 'register' && <Register changeView={changeView} />}
      {currentView === 'dashboard' && <Dashboard />}
    </div>
  );
}

export default App;
