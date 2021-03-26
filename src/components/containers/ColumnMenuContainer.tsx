import { useDetectClick } from 'src/utils/useDetectClick';
import ColumnMenu from 'src/components/presentational/menus/ColumnMenu';

const ColumnMenuContainer = () => {
  const [isActive, setIsActive] = useDetectClick(false);
  const onClick = (): void => {
    setIsActive(!isActive);
  };

  return (
    <>
      <ColumnMenu onClick={onClick} isActive={isActive} />
    </>
  );
};

export default ColumnMenuContainer;
