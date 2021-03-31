import React, { useState, useContext, useCallback } from 'react';
import TaskDataForm from 'src/components/presentational/modals/forms/TaskDataForm';
import AddTaskButton from 'src/components/presentational/buttons/AddTaskButton';
import boardDataContext from 'src/contexts/boardDataContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import addTask from 'src/api/addTask';
import newNotification from 'src/utils/newNotification';
import {
  priority as priorityEnum,
  difficulty as difficultyEnum,
  difficulty,
} from 'src/api/models';

const AddTaskContainer = () => {
  const { boardData, setBoardData } = useContext(boardDataContext);
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

  const getColumnIndex = useCallback((): number => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    return columnIndex;
  }, [boardData, currentColumnId]);

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
    if (inputTitle === '') {
      newNotification('Task title is required.');
      return;
    }
    if (inputTitle.length > 70) {
      newNotification('Task title is too long.');
      return;
    }
    if (inputDescription.length > 400) {
      newNotification('Task description is too long.');
      return;
    }
    if (
      boardData[getColumnIndex()].tasks.length ===
      boardData[getColumnIndex()].limit
    ) {
      newNotification("Can't add more than column's task limit.");
      return;
    }
    try {
      const task = await addTask(
        inputTitle,
        inputDescription,
        inputPriority,
        inputDifficulty,
        currentColumnId
      );
      const newBoardData = [...boardData];
      newBoardData[getColumnIndex()].tasks = newBoardData[
        getColumnIndex()
      ].tasks.map((task) => ({ ...task, position: task.position + 1 }));
      newBoardData[getColumnIndex()].tasks.push(task);
      setBoardData(newBoardData);
      setInputTitle('');
      setInputDescription('');
      closeModal();
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <>
      <AddTaskButton openModal={openModal} />
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
