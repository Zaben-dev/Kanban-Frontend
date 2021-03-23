import { useContext, useState } from 'react';
import tasksContext from 'src/contexts/tasksContext';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import DeleteTask from 'src/components/presentational/DeleteTask';
import getTasks from 'src/api/getTasks';
import deleteTask from 'src/api/deleteTask';
import { TaskData } from 'src/api/models';

const DeleteTaskContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { tasks, setTasks } = useContext(tasksContext);
  const { id: currentTaskId } = useContext(currentTaskIdContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const findTaskIndexById = (task: TaskData): boolean => {
    return task.id === currentTaskId;
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = (): void => {
    setIsLoading((prev) => !prev);
    deleteTask(currentTaskId).then(() => {
      getTasks().then((tasks: TaskData[] | null) => {
        setTasks(tasks);
        closeModal();
        setIsLoading((prev) => !prev);
      });
    });
  };

  return (
    <DeleteTask
      handleDelete={handleDelete}
      isLoading={isLoading}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
      taskTitle={tasks ? tasks[tasks.findIndex(findTaskIndexById)].title : ''}
    />
  );
};

export default DeleteTaskContainer;
