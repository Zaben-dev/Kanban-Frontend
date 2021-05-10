import { createContext } from 'react';

interface ContextProps {
  id: number;
}

const currentRowIdContext = createContext<ContextProps>({
  id: 0,
});

export default currentRowIdContext;
