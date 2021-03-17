import { useContext, useState } from 'react';
import columnsContext from 'src/utils/columnsContext';
import currentColumnIdContext from 'src/utils/currentColumnIdContext';
import DeleteColumn from 'src/components/presentational/DeleteColumn';
import deleteColumn from 'src/api/deleteColumn';
import { ColumnData } from 'src/api/models';

const DeleteColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { columns, setColumns } = useContext(columnsContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const findColumnIndexById = (column: ColumnData): boolean => {
    return column.id === currentColumnId;
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = (): void => {
    setIsLoading((prev) => !prev);
    deleteColumn(currentColumnId).then(() => {
      setColumns((prev) => {
        if (prev === null) return null;
        return prev.filter(({ id }) => id !== currentColumnId);
      });
      setIsLoading((prev) => !prev);
      closeModal();
    });
  };

  return (
    <DeleteColumn
      handleDelete={handleDelete}
      isLoading={isLoading}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
      columnName={
        columns ? columns[columns.findIndex(findColumnIndexById)].name : ''
      }
    />
  );
};

export default DeleteColumnContainer;
