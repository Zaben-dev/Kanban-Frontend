import React, { useState, useContext, useEffect, useCallback } from 'react';
import TaskDataForm from 'src/components/presentational/modals/forms/TaskDataForm';
import EditTaskButton from 'src/components/presentational/buttons/EditTaskButton';
import tasksContext from 'src/contexts/tasksContext';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import newNotification from 'src/utils/newNotification';
import editTask from 'src/api/editTask';
import getTasks from 'src/api/getTasks';
import {
  TaskData,
  priority as priorityEnum,
  difficulty as difficultyEnum,
  difficulty,
} from 'src/api/models';

const AddTaskContainer = () => {
  const { tasks, setTasks } = useContext(tasksContext);
  const { id: currentTaskId } = useContext(currentTaskIdContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputPriority, setInputPriority] = useState<priorityEnum>(
    priorityEnum.Medium
  );
  const [inputDifficulty, setInputDifficulty] = useState<difficultyEnum>(
    difficultyEnum.Intermediate
  );

  const findTaskIndexById = useCallback(
    (task: TaskData): boolean => {
      return task.id === currentTaskId;
    },
    [currentTaskId]
  );

  useEffect(() => {
    setInputTitle(tasks ? tasks[tasks.findIndex(findTaskIndexById)].title : '');
    setInputDescription(
      tasks ? tasks[tasks.findIndex(findTaskIndexById)].description : ''
    );
    setInputPriority(
      tasks
        ? tasks[tasks.findIndex(findTaskIndexById)].priority
        : priorityEnum.Medium
    );
    setInputDifficulty(
      tasks
        ? tasks[tasks.findIndex(findTaskIndexById)].difficulty
        : difficultyEnum.Intermediate
    );
  }, [currentTaskId, findTaskIndexById, tasks]);

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
    try {
      await editTask(
        currentTaskId,
        inputTitle,
        inputDescription,
        inputPriority,
        inputDifficulty
      );
      const tasks = await getTasks();
      setTasks(tasks);
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <>
      <EditTaskButton openModal={openModal} />
      <TaskDataForm
        modalIsOpen={modalIsOpen}
        inputTitle={inputTitle}
        inputDescription={inputDescription}
        inputPriority={inputPriority}
        inputDifficulty={inputDifficulty}
        closeModal={closeModal}
        handleTitleChange={handleTitleChange}
        handleDescriptionChange={handleDescriptionChange}
        handlePriorityChange={handlePriorityChange}
        handleDifficultyChange={handleDifficultyChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddTaskContainer;
