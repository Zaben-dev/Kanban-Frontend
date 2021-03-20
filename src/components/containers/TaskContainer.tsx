import React, { useContext } from 'react';
import Task from 'src/components/presentational/Task';
import { TaskData, priority, difficulty } from 'src/api/models';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import tasksContext from 'src/contexts/tasksContext';

interface Props {
  id: number;
}

const TaskContainer: React.FunctionComponent<Props> = ({ id }) => {
  const { tasks } = useContext(tasksContext);

  const findTaskIndexById = (task: TaskData): boolean => {
    return task.id === id;
  };

  return (
    <currentTaskIdContext.Provider value={{ id }}>
      <Task
        title={tasks ? tasks[tasks.findIndex(findTaskIndexById)].title : ''}
        description={
          tasks ? tasks[tasks.findIndex(findTaskIndexById)].description : ''
        }
        priority={
          tasks
            ? tasks[tasks.findIndex(findTaskIndexById)].priority
            : priority.low
        }
        difficulty={
          tasks
            ? tasks[tasks.findIndex(findTaskIndexById)].difficulty
            : difficulty.easy
        }
      />
    </currentTaskIdContext.Provider>
  );
};

export default TaskContainer;
