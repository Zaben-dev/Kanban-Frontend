import { useContext } from 'react';
import { TaskData } from 'src/api/models';
import boardDataContext from 'src/contexts/boardDataContext';
import TasksArea from 'src/components/presentational/TasksArea';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import TaskContainer from 'src/components/containers/TaskContainer';
import { Droppable } from 'react-beautiful-dnd';

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
    <Droppable droppableId={currentColumnId.toString()}>
      {(provided) => (
        <TasksArea innerRef={provided.innerRef} provided={provided}>
          {getColumnTasks()
            .sort((a, b) => a.position - b.position)
            .map((task, index) => (
              <TaskContainer key={index} index={index} id={task.id} />
            ))}
          {provided.placeholder}
        </TasksArea>
      )}
    </Droppable>
  );
};

export default TasksAreaContainer;
