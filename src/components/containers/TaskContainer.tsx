import React, { useContext, useState } from 'react';
import Task from 'src/components/presentational/Task';
import ShowMoreTask from 'src/components/presentational/modals/ShowMoreTask';
import { TaskData } from 'src/api/models';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  id: number;
  index: number;
}

const TaskContainer: React.FunctionComponent<Props> = ({ id, index }) => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { boardData } = useContext(boardDataContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const getTask = (): TaskData => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    const taskIndex = boardData[columnIndex].tasks.findIndex(
      (task) => task.id === id
    );
    return boardData[columnIndex].tasks[taskIndex];
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
