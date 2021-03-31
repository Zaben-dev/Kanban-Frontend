import { useState, useEffect } from 'react';

declare global {
  interface WindowEventMap {
    OnRewards: CustomEvent;
  }
}

export const useDetectClick = (initialState: any) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: Event) => {
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
