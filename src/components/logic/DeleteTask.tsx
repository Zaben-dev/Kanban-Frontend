import { useContext, useState } from 'react';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import DeleteConfirmation from 'src/components/presentational/modals/confirmations/DeleteConfirmation';
import DeleteTaskButton from 'src/components/presentational/buttons/DeleteTaskButton';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import deleteTask from 'src/api/deleteTask';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';
import findRowIndex from 'src/utils/dataFinders/findRowIndex';
import findTaskIndex from 'src/utils/dataFinders/findTaskIndex';

const DeleteTask = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const { id: currentTaskId } = useContext(currentTaskIdContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rowIndex = findRowIndex(currentColumnId, currentRowId, boardData);
  const taskIndex = findTaskIndex(
    currentColumnId,
    currentRowId,
    currentTaskId,
    boardData
  );
  const task = boardData[columnIndex].rows[rowIndex].tasks[taskIndex];

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteTask(currentTaskId);
      const newBoardData = [...boardData];
      const newTasks = boardData[columnIndex].rows[rowIndex].tasks.filter(
        (task) => task.id !== currentTaskId
      );

      for (let i = taskIndex; i < newTasks.length; i++) {
        newTasks[i].position--;
      }

      newBoardData[columnIndex].rows[rowIndex].tasks = newTasks;
      closeModal();
      setBoardData(newBoardData);
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <>
      <DeleteTaskButton openModal={openModal} />
      <DeleteConfirmation
        handleDelete={handleDelete}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        name={task ? task.title : ''}
      />
    </>
  );
};

export default DeleteTask;
