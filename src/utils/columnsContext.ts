import { createContext } from 'react';
import { ColumnData } from 'src/api/models';

interface ContextProps {
  columns: ColumnData[] | null;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[] | null>>;
}

const columnsContext = createContext<ContextProps>({
  columns: null,
  setColumns: () => {},
});

export default columnsContext;
