import React, { useState, useContext } from 'react';
import TaskDataForm from 'src/components/presentational/modals/forms/TaskDataForm';
import AddTaskButton from 'src/components/presentational/buttons/AddTaskButton';
import boardDataContext from 'src/contexts/boardDataContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import getBoardData from 'src/api/getBoardData';
import addTask from 'src/api/tasks/addTask';
import newNotification from 'src/utils/newNotification';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';
import findRowIndex from 'src/utils/dataFinders/findRowIndex';
import {
  priority as priorityEnum,
  difficulty as difficultyEnum,
  difficulty,
} from 'src/api/models';

const AddTask = () => {
  const { boardData, setBoardData } = useContext(boardDataContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputPriority, setInputPriority] = useState<priorityEnum>(
    priorityEnum.Medium
  );
  const [inputDifficulty, setInputDifficulty] = useState<difficultyEnum>(
    difficultyEnum.Intermediate
  );
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rowIndex = findRowIndex(currentColumnId, currentRowId, boardData);

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
      boardData[columnIndex].rows[rowIndex].tasks.length ===
      boardData[columnIndex].limit
    ) {
      newNotification("Can't add more than rows's task limit.");
      return;
    }
    try {
      await addTask(
        inputTitle,
        inputDescription,
        inputPriority,
        inputDifficulty,
        currentColumnId,
        currentRowId
      );
      const newBoardData = await getBoardData();
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

export default AddTask;
