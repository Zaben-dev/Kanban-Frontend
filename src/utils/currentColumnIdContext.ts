import { createContext } from 'react';

interface ContextProps {
  id: number;
}

const currentColumnIdContext = createContext<ContextProps>({
  id: 0,
});

export default currentColumnIdContext;
