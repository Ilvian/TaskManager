import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskSuccess, setTaskSuccess] = useState(false);

  return (
    <TaskContext.Provider value={{ taskSuccess, setTaskSuccess }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TaskContext);
};