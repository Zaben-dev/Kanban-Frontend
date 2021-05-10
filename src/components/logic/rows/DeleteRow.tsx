import { useContext, useState } from 'react';
import DeleteConfirmation from 'src/components/presentational/modals/confirmations/DeleteConfirmation';
import DeleteRowButton from 'src/components/presentational/buttons/DeleteRowButton';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import getBoardData from 'src/api/getBoardData';
import deleteRow from 'src/api/rows/deleteRow';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';
import findRowIndex from 'src/utils/dataFinders/findRowIndex';

const DeleteRow = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rowIndex = findRowIndex(currentColumnId, currentRowId, boardData);
  const row = boardData[columnIndex].rows[rowIndex];

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = async (): Promise<void> => {
    let error = false;
    boardData.forEach((column) => {
      if (
        column.rows[rowIndex].tasks &&
        column.rows[rowIndex].tasks.length !== 0
      ) {
        closeModal();
        error = true;
      }
    });
    if (error) {
      newNotification("Can't delete row which contain tasks.");
      return;
    }
    try {
      await deleteRow(currentRowId);
      closeModal();
      const newBoardData = await getBoardData();
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
        name={row ? row.name : ''}
      />
    </>
  );
};

export default DeleteRow;
