import { useState, useContext, useEffect, useCallback } from 'react';
import RowDataForm from 'src/components/presentational/modals/forms/RowDataForm';
import EditRowButton from 'src/components/presentational/buttons/EditRowButton';
import editRow from 'src/api/editRow';
import { rowData } from 'src/api/models';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import getBoardData from 'src/api/getBoardData';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';

const AddRowContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const [inputName, setInputName] = useState<string>('');
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

  useEffect(() => {
    setInputName(getRow().name);
  }, [getRow]);

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

export default AddRowContainer;
