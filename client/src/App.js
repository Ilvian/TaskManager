import React from 'react';
import Register from './Auth/Register';
import Login from './Auth/Login';

const App = () => {
  return (
    <div>
      <h1>Task Manager App</h1>
      <Register />
      <hr />
      <Login />
    </div>
  );
};

export default App;
