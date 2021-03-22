import { useState, useContext } from 'react';
import AddColumn from 'src/components/presentational/AddColumn';
import addColumn from 'src/api/addColumn';
import columnsContext from 'src/contexts/columnsContext';

const AddColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleSubmit = (): void => {
    setIsLoading((prev) => !prev);
    addColumn(inputName, inputLimit).then((column) => {
      setColumns((prev) => {
        if (prev === null) return null;
        return [
          ...prev,
          { id: column.id, name: column.name, limit: column.limit },
        ];
      });
      setInputName('');
      setIsLoading((prev) => !prev);
      closeModal();
    });
  };

  return (
    <AddColumn
      handleSubmit={handleSubmit}
      openModal={openModal}
      isLoading={isLoading}
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
