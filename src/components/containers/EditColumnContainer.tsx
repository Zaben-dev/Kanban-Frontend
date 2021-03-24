import { useState, useContext, useCallback, useEffect } from 'react';
import editColumn from 'src/api/editColumn';
import columnsContext from 'src/contexts/columnsContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import { ColumnData } from 'src/api/models';
import EditColumn from 'src/components/presentational/EditColumn';

const EditColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { columns, setColumns } = useContext(columnsContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [inputName, setInputName] = useState<string>('');
  const [inputLimit, setInputLimit] = useState<number>(0);

  const findColumnIndexById = useCallback(
    (column: ColumnData): boolean => {
      return column.id === currentColumnId;
    },
    [currentColumnId]
  );

  useEffect(() => {
    setInputName(
      columns ? columns[columns.findIndex(findColumnIndexById)].name : ''
    );
    setInputLimit(
      columns ? columns[columns.findIndex(findColumnIndexById)].limit : 0
    );
  }, [currentColumnId, findColumnIndexById, columns]);

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
    editColumn(currentColumnId, inputName, inputLimit).then(() => {
      setColumns((prev) => {
        if (prev === null) return null;
        return prev.map((column) =>
          column.id === currentColumnId
            ? { ...column, name: inputName, limit: inputLimit }
            : column
        );
      });
      setIsLoading((prev) => !prev);
      closeModal();
    });
  };
  return (
    <EditColumn
      handleSubmit={handleSubmit}
      openModal={openModal}
      closeModal={closeModal}
      modalIsOpen={modalIsOpen}
      isLoading={isLoading}
      inputName={inputName}
      inputLimit={inputLimit}
      handleNameChange={handleNameChange}
      handleLimitChange={handleLimitChange}
    />
  );
};

export default EditColumnContainer;
