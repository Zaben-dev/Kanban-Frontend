import { useDetectClick } from 'src/utils/useDetectClick';
import TaskMenu from 'src/components/presentational/menus/TaskMenu';

const TaskMenuContainer = () => {
  const [isActive, setIsActive] = useDetectClick(false);
  const onClick = (): void => {
    setIsActive(!isActive);
  };

  return (
    <>
      <TaskMenu onClick={onClick} isActive={isActive} />
    </>
  );
};

export default TaskMenuContainer;
