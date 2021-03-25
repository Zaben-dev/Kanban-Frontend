import { useContext, useState } from 'react';
import tasksContext from 'src/contexts/tasksContext';
import currentTaskIdContext from 'src/contexts/currentTaskIdContext';
import DeleteTask from 'src/components/presentational/DeleteTask';
import newNotification from 'src/utils/newNotification';
import getTasks from 'src/api/getTasks';
import deleteTask from 'src/api/deleteTask';
import { TaskData } from 'src/api/models';

const DeleteTaskContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { tasks, setTasks } = useContext(tasksContext);
  const { id: currentTaskId } = useContext(currentTaskIdContext);

  const findTaskIndexById = (task: TaskData): boolean => {
    return task.id === currentTaskId;
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteTask(currentTaskId);
      const tasks = await getTasks();
      closeModal();
      setTasks(tasks);
    } catch {
      newNotification('Sorry, something went wrong.');
    }
  };

  return (
    <DeleteTask
      handleDelete={handleDelete}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
      taskTitle={tasks ? tasks[tasks.findIndex(findTaskIndexById)].title : ''}
    />
  );
};

export default DeleteTaskContainer;
