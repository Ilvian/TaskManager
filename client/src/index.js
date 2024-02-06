import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from "./components/homepage/homepage";
import Users from "./components/admin/user/Users";
import SimpleUser from "./components/SimpleUser/SimpleUser";

import reportWebVitals from './reportWebVitals';
import {
  QueryClient,
  QueryClientProvider,
  MutationCache
} from '@tanstack/react-query';
import { TaskProvider } from './components/modals/TaskContext';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: data => {
      queryClient.invalidateQueries();
    },
  })
})
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/simpleuser" element={<SimpleUser />} />
        </Routes>
      </Router>
    </TaskProvider>

  </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();