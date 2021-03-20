import { useContext } from 'react';
import tasksContext from 'src/contexts/tasksContext';
import TasksArea from 'src/components/presentational/TasksArea';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import TaskContainer from 'src/components/containers/TaskContainer';

const TasksAreaContainer = () => {
  const { tasks } = useContext(tasksContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);

  return (
    <TasksArea>
      {tasks &&
        tasks
          .filter((task) => task.columnId === currentColumnId)
          .map((task, index) => <TaskContainer key={index} id={task.id} />)}
    </TasksArea>
  );
};

export default TasksAreaContainer;
