import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskUpdate from './components/TaskUpdate';
import TaskDelete from './components/TaskDelete';
import Login from './components/auth/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<TaskCreate />} />
          <Route path="/tasks/update/:taskId" element={<TaskUpdate />} />
          <Route path="/tasks/delete/:taskId" element={<TaskDelete />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;