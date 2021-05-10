import { useContext, useState } from 'react';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import DeleteConfirmation from 'src/components/presentational/modals/confirmations/DeleteConfirmation';
import DeleteColumnButton from 'src/components/presentational/buttons/DeleteColumnButton';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import deleteColumn from 'src/api/deleteColumn';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';

const DeleteColumn = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const column = boardData[findColumnIndex(currentColumnId, boardData)];

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = async (): Promise<void> => {
    boardData[columnIndex].rows.map((row) => {
      if (row.tasks && row.tasks.length !== 0) {
        newNotification("Can't delete column which contain tasks.");
        closeModal();
        return;
      }
    });
    try {
      await deleteColumn(currentColumnId);
      closeModal();
      const newBoardData = boardData.filter(
        (column) => column.id !== currentColumnId
      );
      setBoardData(newBoardData);
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <>
      <DeleteColumnButton openModal={openModal} />
      <DeleteConfirmation
        handleDelete={handleDelete}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        name={column.name}
      />
    </>
  );
};

export default DeleteColumn;
