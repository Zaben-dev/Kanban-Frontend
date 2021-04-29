import { useDetectClick } from 'src/utils/useDetectClick';
import RowMenu from 'src/components/presentational/menus/RowMenu';

const RowMenuContainer = () => {
  const [isActive, setIsActive] = useDetectClick(false);
  const onClick = (): void => {
    setIsActive(!isActive);
  };

  return (
    <>
      <RowMenu onClick={onClick} isActive={isActive} />
    </>
  );
};

export default RowMenuContainer;
