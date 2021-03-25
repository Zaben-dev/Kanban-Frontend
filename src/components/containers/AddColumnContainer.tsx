import { useState, useContext } from 'react';
import AddColumn from 'src/components/presentational/AddColumn';
import addColumn from 'src/api/addColumn';
import columnsContext from 'src/contexts/columnsContext';
import newNotification from 'src/utils/newNotification';

const AddColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { setColumns } = useContext(columnsContext);
  const [inputName, setInputName] = useState<string>('');
  const [inputLimit, setInputLimit] = useState<number>(10);

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

  const handleSubmit = async (): Promise<void> => {
    if (inputName === '') {
      newNotification('Please provide all required fields.');
      return;
    }
    try {
      const column = await addColumn(inputName, inputLimit);
      setColumns((prev) => {
        if (prev === null) return null;
        return [
          ...prev,
          { id: column.id, name: column.name, limit: column.limit },
        ];
      });
      setInputName('');
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <AddColumn
      handleSubmit={handleSubmit}
      openModal={openModal}
      closeModal={closeModal}
      modalIsOpen={modalIsOpen}
      inputName={inputName}
      inputLimit={inputLimit}
      handleNameChange={handleNameChange}
      handleLimitChange={handleLimitChange}
    />
  );
};

export default AddColumnContainer;
