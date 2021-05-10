import { useState, useContext, useEffect } from 'react';
import RowDataForm from 'src/components/presentational/modals/forms/RowDataForm';
import EditRowButton from 'src/components/presentational/buttons/EditRowButton';
import editRow from 'src/api/rows/editRow';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import getBoardData from 'src/api/getBoardData';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';
import findRowIndex from 'src/utils/dataFinders/findRowIndex';

const EditRow = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const [inputName, setInputName] = useState<string>('');
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rowIndex = findRowIndex(currentColumnId, currentRowId, boardData);
  const row = boardData[columnIndex].rows[rowIndex];

  useEffect(() => {
    setInputName(row.name);
  }, [row]);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputName(event.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    if (inputName === '') {
      newNotification('Please provide all required fields.');
      return;
    }
    if (inputName.length > 35) {
      newNotification('Row name is too long.');
      return;
    }
    try {
      await editRow(currentRowId, inputName);
      const newBoardData = await getBoardData();
      setBoardData(newBoardData);
      setInputName('');
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <>
      <EditRowButton openModal={openModal} />
      <RowDataForm
        handleSubmit={handleSubmit}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        inputName={inputName}
        handleNameChange={handleNameChange}
      />
    </>
  );
};

export default EditRow;
