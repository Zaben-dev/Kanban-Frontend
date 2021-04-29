import { useContext, useState, useCallback } from 'react';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import DeleteConfirmation from 'src/components/presentational/modals/confirmations/DeleteConfirmation';
import DeleteTaskButton from 'src/components/presentational/buttons/DeleteTaskButton';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import deleteTask from 'src/api/deleteTask';
import { TaskData } from 'src/api/models';

const DeleteTaskContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const { id: currentTaskId } = useContext(currentTaskIdContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);

  const getColumnIndex = useCallback((): number => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    return columnIndex;
  }, [boardData, currentColumnId]);

  const getRowIndex = useCallback((): number => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );

    const rowIndex = boardData[columnIndex].rows.findIndex(
      (row) => row.id === currentRowId
    );

    return rowIndex;
  }, [boardData, currentRowId, currentColumnId]);

  const getTaskIndex = useCallback((): number => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );

    const rowIndex = boardData[columnIndex].rows.findIndex(
      (row) => row.id === currentRowId
    );

    const taskIndex = boardData[columnIndex].rows[rowIndex].tasks.findIndex(
      (task) => task.id === currentTaskId
    );
    return taskIndex;
  }, [boardData, currentTaskId, currentColumnId]);

  const getTask = useCallback((): TaskData => {
    return boardData[getColumnIndex()].rows[getRowIndex()].tasks[
      getTaskIndex()
    ];
  }, [boardData, getColumnIndex, getTaskIndex]);

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
      const newTasks = boardData[getColumnIndex()].rows[
        getRowIndex()
      ].tasks.filter((task) => task.id !== currentTaskId);

      for (let i = getTaskIndex(); i < newTasks.length; i++) {
        newTasks[i].position--;
      }

      newBoardData[getColumnIndex()].rows[getRowIndex()].tasks = newTasks;
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
        name={getTask() ? getTask().title : ''}
      />
    </>
  );
};

export default DeleteTaskContainer;
