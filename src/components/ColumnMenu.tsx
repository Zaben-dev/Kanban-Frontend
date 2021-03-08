import React, { useRef } from 'react';
import { useDetectOutsideClick } from 'src/utils/useDetectOutsideClick';
import ColumnMenuUI from 'src/components/ColumnMenuUI';

const ColumnMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <ColumnMenuUI
        onClick={onClick}
        isActive={isActive}
        dropdownRef={dropdownRef}
      />
    </>
  );
};

export default ColumnMenu;
