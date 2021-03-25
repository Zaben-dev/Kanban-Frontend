import { useState, useContext, useCallback, useEffect } from 'react';
import editColumn from 'src/api/editColumn';
import tasksContext from 'src/contexts/tasksContext';
import columnsContext from 'src/contexts/columnsContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import newNotification from 'src/utils/newNotification';
import { ColumnData } from 'src/api/models';
import EditColumn from 'src/components/presentational/EditColumn';

const EditColumnContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { columns, setColumns } = useContext(columnsContext);
  const { tasks } = useContext(tasksContext);
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

  const handleSubmit = async (): Promise<void> => {
    if (inputName === '') {
      newNotification('Please provide all required fields.');
      return;
    }
    if (!tasks) return;
    if (
      inputLimit <
      tasks.filter((task) => task.columnId === currentColumnId).length
    ) {
      newNotification(" Limit can't be less than the number of tasks");
      return;
    }

    try {
      await editColumn(currentColumnId, inputName, inputLimit);
      setColumns((prev) => {
        if (prev === null) return null;
        return prev.map((column) =>
          column.id === currentColumnId
            ? { ...column, name: inputName, limit: inputLimit }
            : column
        );
      });
      setInputName('');
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };
  return (
    <EditColumn
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

export default EditColumnContainer;
