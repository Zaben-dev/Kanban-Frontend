import { useContext } from 'react';
import { TaskData } from 'src/api/models';
import boardDataContext from 'src/contexts/boardDataContext';
import TasksArea from 'src/components/presentational/TasksArea';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import TaskContainer from 'src/components/containers/TaskContainer';
import { Droppable } from 'react-beautiful-dnd';

const TasksAreaContainer = () => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const { boardData } = useContext(boardDataContext);

  const getTasks = (): TaskData[] => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    console.log('test row ID' + currentRowId);
    const rowIndex = boardData[columnIndex].rows.findIndex(
      (row) => row.id === currentRowId
    );

    return boardData[columnIndex].rows[rowIndex].tasks;
  };

  return (
    <Droppable droppableId={currentColumnId.toString()}>
      {(provided) => (
        <TasksArea innerRef={provided.innerRef} provided={provided}>
          {getTasks()
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
