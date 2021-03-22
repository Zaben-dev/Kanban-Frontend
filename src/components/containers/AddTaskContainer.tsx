import React, { useState, useContext } from 'react';
import AddTask from 'src/components/presentational/AddTask';
import tasksContext from 'src/contexts/tasksContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import addTask from 'src/api/addTask';
import getTasks from 'src/api/getTasks';
import {
  TaskData,
  priority as priorityEnum,
  difficulty as difficultyEnum,
  difficulty,
} from 'src/api/models';

const AddTaskContainer = () => {
  const { setTasks } = useContext(tasksContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputPriority, setInputPriority] = useState<priorityEnum>(
    priorityEnum.Medium
  );
  const [inputDifficulty, setInputDifficulty] = useState<difficultyEnum>(
    difficultyEnum.Intermediate
  );

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

  const handleSubmit = (): void => {
    setIsLoading(true);
    addTask(
      inputTitle,
      inputDescription,
      inputPriority,
      inputDifficulty,
      currentColumnId
    )
      .then(() => {
        getTasks().then((tasks: TaskData[] | null) => {
          setTasks(tasks);
          setInputTitle('');
          setInputDescription('');
          closeModal();
          setIsLoading((prev) => !prev);
        });
      })
      .catch((e) => {
        closeModal();
        setIsLoading(false);
      });
  };

  return (
    <AddTask
      modalIsOpen={modalIsOpen}
      isLoading={isLoading}
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
