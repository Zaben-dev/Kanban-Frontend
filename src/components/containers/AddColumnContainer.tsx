import { useState, useContext } from 'react';
import AddColumn from 'src/components/presentational/AddColumn';
import addColumn from 'src/api/addColumn';
import columnsContext from 'src/utils/columnsContext';

const AddColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { setColumns } = useContext(columnsContext);
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputLimitValue, setInputLimitValue] = useState(10);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
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

  const handleSubmit = () => {
    addColumn(inputNameValue, inputLimitValue).then((column) => {
      setColumns((prev) => {
        if (prev === null) return null;
        return [
          ...prev,
          { id: column.id, name: column.name, limit: column.limit },
        ];
      });
      closeModal();
    });
  };

  return (
    <AddColumn
      handleSubmit={handleSubmit}
      openModal={openModal}
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
