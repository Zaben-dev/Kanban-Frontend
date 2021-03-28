import { useState, useContext, useCallback, useEffect } from 'react';
import editColumn from 'src/api/editColumn';
import boardDataContext from 'src/contexts/boardDataContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import newNotification from 'src/utils/newNotification';
import { ColumnData } from 'src/api/models';
import ColumnDataForm from 'src/components/presentational/modals/forms/ColumnDataForm';
import EditColumnButton from 'src/components/presentational/buttons/EditColumnButton';

const EditColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [inputName, setInputName] = useState<string>('');
  const [inputLimit, setInputLimit] = useState<number | null>(0);

  const getColumnIndex = useCallback((): number => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    return columnIndex;
  }, [boardData, currentColumnId]);

  const getColumn = useCallback((): ColumnData => {
    return boardData[getColumnIndex()];
  }, [boardData, getColumnIndex]);

  useEffect(() => {
    setInputName(getColumn().name);
    setInputLimit(getColumn().limit);
  }, [getColumn]);

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
      setInputLimit(
        boardData[getColumnIndex()].tasks.filter(
          (task) => task.columnId === currentColumnId
        ).length
      );
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (inputName === '') {
      newNotification('Please provide all required fields.');
      return;
    }
    if (
      inputLimit !== null &&
      inputLimit <
        boardData[getColumnIndex()].tasks.filter(
          (task) => task.columnId === currentColumnId
        ).length
    ) {
      newNotification(" Limit can't be less than the number of tasks");
      return;
    }

    try {
      const column = await editColumn(currentColumnId, inputName, inputLimit);
      const newBoardData = [...boardData];
      newBoardData[getColumnIndex()] = {
        id: column.id,
        name: column.name,
        limit: column.limit,
        tasks: boardData[getColumnIndex()].tasks,
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

export default EditColumnContainer;
