import { createContext } from 'react';

interface ContextProps {
  id: number;
}

const currentTaskIdContext = createContext<ContextProps>({
  id: 0,
});

export default currentTaskIdContext;
