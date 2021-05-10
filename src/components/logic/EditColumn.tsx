import { useState, useContext, useEffect } from 'react';
import editColumn from 'src/api/editColumn';
import boardDataContext from 'src/contexts/boardDataContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import newNotification from 'src/utils/newNotification';
import ColumnDataForm from 'src/components/presentational/modals/forms/ColumnDataForm';
import EditColumnButton from 'src/components/presentational/buttons/EditColumnButton';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';

const EditColumn = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [inputName, setInputName] = useState<string>('');
  const [inputLimit, setInputLimit] = useState<number | null>(0);
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const column = boardData[findColumnIndex(currentColumnId, boardData)];

  useEffect(() => {
    setInputName(column.name);
    setInputLimit(column.limit);
  }, [column]);

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

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputLimit(parseInt(event.target.value));
  };

  const handleInfiniteLimit = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked === true) {
      setInputLimit(null);
    }
    if (event.target.checked === false) {
      setInputLimit(boardData[columnIndex].limit);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (inputName === '') {
      newNotification('Please provide all required fields.');
      return;
    }
    if (inputName.length > 40) {
      newNotification('Column name is too long.');
      return;
    }

    boardData[columnIndex].rows.forEach((row) => {
      if (inputLimit && inputLimit < row.tasks.length) {
        newNotification(" Limit can't be less than the number of tasks");
        return;
      }
    });

    try {
      const column = await editColumn(currentColumnId, inputName, inputLimit);
      const newBoardData = [...boardData];
      newBoardData[columnIndex] = {
        id: column.id,
        name: column.name,
        limit: column.limit,
        rows: boardData[columnIndex].rows,
      };
      setBoardData(newBoardData);
      setInputName('');
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };
  return (
    <>
      <EditColumnButton openModal={openModal} />
      <ColumnDataForm
        handleSubmit={handleSubmit}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        inputName={inputName}
        inputLimit={inputLimit}
        handleNameChange={handleNameChange}
        handleLimitChange={handleLimitChange}
        handleInfiniteLimit={handleInfiniteLimit}
      />
    </>
  );
};

export default EditColumn;
