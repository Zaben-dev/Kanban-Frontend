import { useState, useContext } from 'react';
import editColumn from 'src/api/editColumn';
import columnsContext from 'src/utils/columnsContext';
import currentColumnIdContext from 'src/utils/currentColumnIdContext';
import { ColumnData } from 'src/api/models';
import EditColumn from 'src/components/presentational/EditColumn';

const EditColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { columns, setColumns } = useContext(columnsContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [inputNameValue, setInputNameValue] = useState(
    columns ? columns[columns.findIndex(findColumnIndexById)].name : ''
  );
  const [inputLimitValue, setInputLimitValue] = useState(
    columns ? columns[columns.findIndex(findColumnIndexById)].limit : 0
  );

  function findColumnIndexById(column: ColumnData) {
    return column.id === currentColumnId;
  }

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
    editColumn(currentColumnId, inputNameValue, inputLimitValue).then(() => {
      setColumns((prev) => {
        if (prev === null) return null;
        return prev.map((column) =>
          column.id === currentColumnId
            ? { ...column, name: inputNameValue, limit: inputLimitValue }
            : column
        );
      });
      closeModal();
    });
  };
  return (
    <EditColumn
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

export default EditColumnContainer;
