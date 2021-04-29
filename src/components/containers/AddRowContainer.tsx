import { useState, useContext } from 'react';
import RowDataForm from 'src/components/presentational/modals/forms/RowDataForm';
import AddRowButton from 'src/components/presentational/buttons/AddRowButton';
import addRow from 'src/api/addRow';
import getBoardData from 'src/api/getBoardData';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';

const AddRowContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { setBoardData } = useContext(boardDataContext);
  const [inputName, setInputName] = useState<string>('');

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
      await addRow(inputName);
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
      <AddRowButton openModal={openModal} />
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
