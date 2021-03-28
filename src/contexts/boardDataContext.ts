import { createContext } from 'react';
import { boardData } from 'src/api/models';

interface ContextProps {
  boardData: boardData[];
  setBoardData: React.Dispatch<React.SetStateAction<boardData[]>>;
}

const boardDataContext = createContext<ContextProps>({
  boardData: [],
  setBoardData: () => {},
});

export default boardDataContext;
