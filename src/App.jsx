import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import GroupList from './components/GroupList';
import AddGroup from './components/AddGroup'
import EditGroup from './components/EditGroup'
import Group from './components/Group';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';
import Expense from './components/Expense';
import Movements from './components/Movements';


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

        <Route path="/group/:id/addexpense" element={<AddExpense />} />
        <Route path="/group/:id/editexpense/:expenseId" element={<EditExpense />} />
        <Route path="/group/:id/expense/:expenseId" element={<Expense />} />

        <Route path="/group/:groupId/movements" element={<Movements />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
