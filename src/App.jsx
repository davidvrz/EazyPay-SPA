import { Routes, Route } from 'react-router-dom';
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import Login from './components/users/Login';
import Register from './components/users/Register';
import GroupList from './components/groups/GroupList';
import AddGroup from './components/groups/AddGroup'
import EditGroup from './components/groups/EditGroup'
import Group from './components/groups/Group';
import AddExpense from './components/expenses/AddExpense';
import EditExpense from './components/expenses/EditExpense';
import Expense from './components/expenses/Expense';
import Movements from './components/groups/Movements';


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
