import React, { useState, useContext, useEffect } from 'react';
import TaskDataForm from 'src/components/presentational/modals/forms/TaskDataForm';
import EditTaskButton from 'src/components/presentational/buttons/EditTaskButton';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import editTask from 'src/api/tasks/editTask';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';
import findRowIndex from 'src/utils/dataFinders/findRowIndex';
import findTaskIndex from 'src/utils/dataFinders/findTaskIndex';
import {
  priority as priorityEnum,
  difficulty as difficultyEnum,
  difficulty,
} from 'src/api/models';

const EditTask = () => {
  const { id: currentTaskId } = useContext(currentTaskIdContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { id: currentRowId } = useContext(currentRowIdContext);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>('');
  const { boardData, setBoardData } = useContext(boardDataContext);
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputPriority, setInputPriority] = useState<priorityEnum>(
    priorityEnum.Medium
  );
  const [inputDifficulty, setInputDifficulty] = useState<difficultyEnum>(
    difficultyEnum.Intermediate
  );
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rowIndex = findRowIndex(currentColumnId, currentRowId, boardData);
  const taskIndex = findTaskIndex(
    currentColumnId,
    currentRowId,
    currentTaskId,
    boardData
  );
  const task = boardData[columnIndex].rows[rowIndex].tasks[taskIndex];

  useEffect(() => {
    setInputTitle(task.title);
    setInputDescription(task.description);
    setInputPriority(task.priority);
    setInputDifficulty(task.difficulty);
  }, [task]);

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
      newNotification('Task Title is required.');
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
    try {
      const editedTask = await editTask(
        currentTaskId,
        inputTitle,
        inputDescription,
        inputPriority,
        inputDifficulty
      );

      const newBoardData = [...boardData];
      newBoardData[columnIndex].rows[rowIndex].tasks[taskIndex] = {
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
        priority: editedTask.priority,
        difficulty: editedTask.difficulty,
        rowId: editedTask.rowId,
        columnId: editedTask.columnId,
        position: editedTask.position,
      };
      setBoardData(newBoardData);
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

export default EditTask;
