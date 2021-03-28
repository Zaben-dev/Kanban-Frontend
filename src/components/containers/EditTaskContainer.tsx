import React, { useState, useContext, useEffect, useCallback } from 'react';
import TaskDataForm from 'src/components/presentational/modals/forms/TaskDataForm';
import EditTaskButton from 'src/components/presentational/buttons/EditTaskButton';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import boardDataContext from 'src/contexts/boardDataContext';
import newNotification from 'src/utils/newNotification';
import editTask from 'src/api/editTask';
import {
  TaskData,
  priority as priorityEnum,
  difficulty as difficultyEnum,
  difficulty,
} from 'src/api/models';

const AddTaskContainer = () => {
  const { id: currentTaskId } = useContext(currentTaskIdContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
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

  const getColumnIndex = useCallback((): number => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    return columnIndex;
  }, [boardData, currentColumnId]);

  const getTaskIndex = useCallback((): number => {
    const columnIndex = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    const taskIndex = boardData[columnIndex].tasks.findIndex(
      (task) => task.id === currentTaskId
    );
    return taskIndex;
  }, [boardData, currentTaskId, currentColumnId]);

  const getTask = useCallback((): TaskData => {
    return boardData[getColumnIndex()].tasks[getTaskIndex()];
  }, [boardData, getColumnIndex, getTaskIndex]);

  useEffect(() => {
    setInputTitle(getTask().title);
    setInputDescription(getTask().description);
    setInputPriority(getTask().priority);
    setInputDifficulty(getTask().difficulty);
  }, [getTask]);

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
      const editedTask = await editTask(
        currentTaskId,
        inputTitle,
        inputDescription,
        inputPriority,
        inputDifficulty
      );

      const newBoardData = [...boardData];
      newBoardData[getColumnIndex()].tasks[getTaskIndex()] = {
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
        priority: editedTask.priority,
        difficulty: editedTask.difficulty,
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

export default AddTaskContainer;
