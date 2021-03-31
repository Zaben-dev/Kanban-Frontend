import { useState, useContext } from 'react';
import ColumnDataForm from 'src/components/presentational/modals/forms/ColumnDataForm';
import AddColumnButton from 'src/components/presentational/buttons/AddColumnButton';
import addColumn from 'src/api/addColumn';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';

const AddColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { boardData, setBoardData } = useContext(boardDataContext);
  const [inputName, setInputName] = useState<string>('');
  const [inputLimit, setInputLimit] = useState<number | null>(10);

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
      setInputLimit(10);
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
    try {
      const column = await addColumn(inputName, inputLimit);
      const newBoardData = [
        ...boardData,
        { id: column.id, name: column.name, limit: column.limit, tasks: [] },
      ];
      setBoardData(newBoardData);
      setInputName('');
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <>
      <AddColumnButton openModal={openModal} />
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

export default AddColumnContainer;
