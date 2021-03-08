import { useState, useEffect } from 'react';

export const useDetectOutsideClick = (el: any, initialState: any) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: any) => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
