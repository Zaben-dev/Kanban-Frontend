import { createContext } from 'react';
import { TaskData } from 'src/api/models';

interface ContextProps {
  tasks: TaskData[] | null;
  setTasks: React.Dispatch<React.SetStateAction<TaskData[] | null>>;
}

const tasksContext = createContext<ContextProps>({
  tasks: null,
  setTasks: () => {},
});

export default tasksContext;
