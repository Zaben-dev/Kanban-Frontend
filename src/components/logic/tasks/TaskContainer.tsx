import React, { useContext, useState } from 'react';
import Task from 'src/components/presentational/Task';
import ShowMoreTask from 'src/components/presentational/modals/ShowMoreTask';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import { Draggable } from 'react-beautiful-dnd';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';
import findRowIndex from 'src/utils/dataFinders/findRowIndex';
import findTaskIndex from 'src/utils/dataFinders/findTaskIndex';

interface Props {
  id: number;
  index: number;
}

const TaskContainer: React.FunctionComponent<Props> = ({ id, index }) => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const { boardData } = useContext(boardDataContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rowIndex = findRowIndex(currentColumnId, currentRowId, boardData);
  const taskIndex = findTaskIndex(currentColumnId, currentRowId, id, boardData);
  const task = boardData[columnIndex].rows[rowIndex].tasks[taskIndex];

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return (
    <currentTaskIdContext.Provider value={{ id }}>
      <ShowMoreTask
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title={task.title}
        description={task.description}
      />
      <Draggable key={id} draggableId={id + ''} index={index}>
        {(provided) => (
          <Task
            provided={provided}
            innerRef={provided.innerRef}
            title={task.title}
            description={task.description}
            priority={task.priority}
            difficulty={task.difficulty}
            openModal={openModal}
          />
        )}
      </Draggable>
    </currentTaskIdContext.Provider>
  );
};

export default TaskContainer;
