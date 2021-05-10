import { useContext } from 'react';
import boardDataContext from 'src/contexts/boardDataContext';
import DroppableArea from 'src/components/presentational/DroppableArea';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import TaskContainer from 'src/components/logic/tasks/TaskContainer';
import { Droppable } from 'react-beautiful-dnd';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';
import findRowIndex from 'src/utils/dataFinders/findRowIndex';

const RenderTasks = () => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const { boardData } = useContext(boardDataContext);
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rowIndex = findRowIndex(currentColumnId, currentRowId, boardData);
  const tasks = boardData[columnIndex].rows[rowIndex].tasks;

  return (
    <Droppable droppableId={currentColumnId + ',' + currentRowId}>
      {(provided) => (
        <DroppableArea innerRef={provided.innerRef} provided={provided}>
          {tasks
            .sort((a, b) => a.position - b.position)
            .map((task, index) => (
              <TaskContainer key={index} index={index} id={task.id} />
            ))}
          {provided.placeholder}
        </DroppableArea>
      )}
    </Droppable>
  );
};

export default RenderTasks;
