import { useContext, useState } from 'react';
import columnsContext from 'src/contexts/columnsContext';
import tasksContext from 'src/contexts/tasksContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import DeleteColumn from 'src/components/presentational/DeleteColumn';
import newNotification from 'src/utils/newNotification';
import deleteColumn from 'src/api/deleteColumn';
import { ColumnData } from 'src/api/models';

const DeleteColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { columns, setColumns } = useContext(columnsContext);
  const { tasks } = useContext(tasksContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);

  const findColumnIndexById = (column: ColumnData): boolean => {
    return column.id === currentColumnId;
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = async (): Promise<void> => {
    if (!tasks) return;
    if (
      tasks.filter((task) => {
        return task.columnId === currentColumnId;
      }).length !== 0
    ) {
      newNotification("Can't delete column which contain tasks.");
      closeModal();
      return;
    }
    try {
      await deleteColumn(currentColumnId);
      closeModal();
      setColumns((prev) => {
        if (prev === null) return null;
        return prev.filter(({ id }) => id !== currentColumnId);
      });
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <DeleteColumn
      handleDelete={handleDelete}
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
