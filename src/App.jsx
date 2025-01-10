import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import GroupList from './components/GroupList';
import AddGroup from './components/AddGroup'
import EditGroup from './components/EditGroup'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Group from './components/Group';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<GroupList />} />
        <Route path="/addgroup" element={<AddGroup />} />
        <Route path="/editgroup/:id" element={<EditGroup />} />
        <Route path="/group/:id" element={<Group />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
