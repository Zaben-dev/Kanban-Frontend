import { useState, useEffect } from 'react';

export const useDetectClick = (initialState: any) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: any) => {
      if (e) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive]);

  return [isActive, setIsActive];
};
