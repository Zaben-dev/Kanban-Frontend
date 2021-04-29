import { useContext, useState, useCallback } from 'react';
import DeleteConfirmation from 'src/components/presentational/modals/confirmations/DeleteConfirmation';
import DeleteRowButton from 'src/components/presentational/buttons/DeleteRowButton';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import getBoardData from 'src/api/getBoardData';
import deleteRow from 'src/api/deleteRow';
import { rowData } from 'src/api/models';

const DeleteTaskContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
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

  const getRow = useCallback((): rowData => {
    return boardData[getColumnIndex()].rows[getRowIndex()];
  }, [boardData, getColumnIndex]);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteRow(currentRowId);
      // const newBoardData = [...boardData];
      // const newRows = boardData[getColumnIndex()].rows.filter(
      //   (row) => row.id !== currentRowId
      // );

      // newBoardData[getColumnIndex()].rows = newRows;
      const newBoardData = await getBoardData();
      setBoardData(newBoardData);
      closeModal();
      setBoardData(newBoardData);
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <>
      <DeleteRowButton openModal={openModal} />
      <DeleteConfirmation
        handleDelete={handleDelete}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        name={getRow() ? getRow().name : ''}
      />
    </>
  );
};

export default DeleteTaskContainer;
