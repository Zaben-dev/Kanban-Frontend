import React, { useContext, useState } from 'react';
import Task from 'src/components/presentational/Task';
import ShowMoreTask from 'src/components/presentational/modals/ShowMoreTask';
import { TaskData } from 'src/api/models';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  id: number;
  index: number;
}

const TaskContainer: React.FunctionComponent<Props> = ({ id, index }) => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const { boardData } = useContext(boardDataContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const getTask = (): TaskData => {
    console.log('currentcolumnId' + currentColumnId);
    console.log('currentRowId' + currentRowId);
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    const rowIndex = boardData[columnIndex].rows.findIndex(
      (row) => row.id === currentRowId
    );
    console.log('ROw index' + rowIndex);
    const taskIndex = boardData[columnIndex].rows[rowIndex].tasks.findIndex(
      (task) => task.id === id
    );
    return boardData[columnIndex].rows[rowIndex].tasks[taskIndex];
  };

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
        title={getTask().title}
        description={getTask().description}
      />
      <Draggable key={id} draggableId={id.toString()} index={index}>
        {(provided) => (
          <Task
            provided={provided}
            innerRef={provided.innerRef}
            title={getTask().title}
            description={getTask().description}
            priority={getTask().priority}
            difficulty={getTask().difficulty}
            openModal={openModal}
          />
        )}
      </Draggable>
    </currentTaskIdContext.Provider>
  );
};

export default TaskContainer;
