import axios from 'axios';
import { ColumnData } from 'src/api/models';

const parseColumns = (columns: ColumnData[]): ColumnData[] => {
  const parsedColumns = columns.map((column) => ({
    id: Number(column.id),
    name: String(column.name),
    limit: Number(column.limit),
  }));
  return parsedColumns;
};

const getColumns = async (): Promise<ColumnData[] | null> => {
  try {
    const response = await axios.get('/columns');
    return parseColumns(response.data.columns);
  } catch (e) {
    return null;
  }
};

export default getColumns;
