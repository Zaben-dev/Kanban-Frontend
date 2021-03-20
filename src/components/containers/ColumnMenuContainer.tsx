import { useRef } from 'react';
import { useDetectOutsideClick } from 'src/utils/useDetectOutsideClick';
import ColumnMenu from 'src/components/presentational/ColumnMenu';

const ColumnMenuContainer = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (): void => {
    setIsActive(!isActive);
  };

  return (
    <>
      <ColumnMenu
        onClick={onClick}
        isActive={isActive}
        dropdownRef={dropdownRef}
      />
    </>
  );
};

export default ColumnMenuContainer;
