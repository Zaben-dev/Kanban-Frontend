import axios from 'axios';

interface Column {
  id: number;
  name: string;
  limit: number;
}

const parseColumns = (columns: Column[]): Column[] => {
  const parsedColumns = columns.map((column) => ({
    id: Number(column.id),
    name: String(column.name),
    limit: Number(column.limit),
  }));
  return parsedColumns;
};

const getColumns = async (): Promise<Column[] | null> => {
  try {
    const response = await axios.get('/columns');
    return parseColumns(response.data.columns);
  } catch (e) {
    return null;
  }
};

export default getColumns;
