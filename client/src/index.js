import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from "./components/homepage/homepage";
import UserPage from "./components/user/userPage";
import reportWebVitals from './reportWebVitals';
import {
  QueryClient,
  QueryClientProvider,
  MutationCache
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: data => {
      queryClient.invalidateQueries();
    },
  })
})
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();