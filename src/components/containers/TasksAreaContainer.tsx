import { useContext } from 'react';
import { TaskData } from 'src/api/models';
import boardDataContext from 'src/contexts/boardDataContext';
import TasksArea from 'src/components/presentational/TasksArea';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import TaskContainer from 'src/components/containers/TaskContainer';

const TasksAreaContainer = () => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { boardData } = useContext(boardDataContext);

  const getColumnTasks = (): TaskData[] => {
    const index = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    return boardData[index].tasks;
  };

  return (
    <TasksArea>
      {getColumnTasks()
        .sort((a, b) => a.position - b.position)
        .map((task, index) => (
          <TaskContainer key={index} id={task.id} />
        ))}
    </TasksArea>
  );
};

export default TasksAreaContainer;
