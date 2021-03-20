import { useState, useContext } from 'react';
import AddColumn from 'src/components/presentational/AddColumn';
import addColumn from 'src/api/addColumn';
import columnsContext from 'src/contexts/columnsContext';

const AddColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setColumns } = useContext(columnsContext);
  const [inputNameValue, setInputNameValue] = useState<string>('');
  const [inputLimitValue, setInputLimitValue] = useState<number>(10);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputNameValue(event.target.value);
  };

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputLimitValue(parseInt(event.target.value));
  };

  const handleSubmit = (): void => {
    setIsLoading((prev) => !prev);
    addColumn(inputNameValue, inputLimitValue).then((column) => {
      setColumns((prev) => {
        if (prev === null) return null;
        return [
          ...prev,
          { id: column.id, name: column.name, limit: column.limit },
        ];
      });
      setInputNameValue('');
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
      inputNameValue={inputNameValue}
      inputLimitValue={inputLimitValue}
      handleNameChange={handleNameChange}
      handleLimitChange={handleLimitChange}
    />
  );
};

export default AddColumnContainer;
