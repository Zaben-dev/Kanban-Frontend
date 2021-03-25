import React, { useState, useContext } from 'react';
import AddTask from 'src/components/presentational/AddTask';
import tasksContext from 'src/contexts/tasksContext';
import columnsContext from 'src/contexts/columnsContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import addTask from 'src/api/addTask';
import getTasks from 'src/api/getTasks';
import newNotification from 'src/utils/newNotification';
import {
  ColumnData,
  priority as priorityEnum,
  difficulty as difficultyEnum,
  difficulty,
} from 'src/api/models';

const AddTaskContainer = () => {
  const { tasks, setTasks } = useContext(tasksContext);
  const { columns } = useContext(columnsContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputPriority, setInputPriority] = useState<priorityEnum>(
    priorityEnum.Medium
  );
  const [inputDifficulty, setInputDifficulty] = useState<difficultyEnum>(
    difficultyEnum.Intermediate
  );

  const findColumnIndexById = (column: ColumnData): boolean => {
    return column.id === currentColumnId;
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInputDescription(event.target.value);
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    switch (event.target.value) {
      case priorityEnum.Low:
        setInputPriority(priorityEnum.Low);
        break;
      case priorityEnum.Medium:
        setInputPriority(priorityEnum.Medium);
        break;
      case priorityEnum.High:
        setInputPriority(priorityEnum.High);
        break;
    }
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    switch (event.target.value) {
      case difficultyEnum.Easy:
        setInputDifficulty(difficultyEnum.Easy);
        break;
      case difficultyEnum.Intermediate:
        setInputDifficulty(difficultyEnum.Intermediate);
        break;
      case difficulty.Hard:
        setInputDifficulty(difficultyEnum.Hard);
        break;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (inputTitle === '' || inputDescription === '') {
      newNotification('Please provide all required fields.');
      return;
    }
    if (!tasks) return;
    if (!columns) return;
    if (
      tasks.filter((task) => task.columnId === currentColumnId).length ===
      columns[columns.findIndex(findColumnIndexById)].limit
    ) {
      newNotification("Can't add more than column's task limit.");
      closeModal();
      return;
    }
    try {
      await addTask(
        inputTitle,
        inputDescription,
        inputPriority,
        inputDifficulty,
        currentColumnId
      );
      const tasks = await getTasks();
      setTasks(tasks);
      setInputTitle('');
      setInputDescription('');
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <AddTask
      modalIsOpen={modalIsOpen}
      inputTitle={inputTitle}
      inputDescription={inputDescription}
      inputPriority={inputPriority}
      inputDifficulty={inputDifficulty}
      openModal={openModal}
      closeModal={closeModal}
      handleTitleChange={handleTitleChange}
      handleDescriptionChange={handleDescriptionChange}
      handlePriorityChange={handlePriorityChange}
      handleDifficultyChange={handleDifficultyChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddTaskContainer;
