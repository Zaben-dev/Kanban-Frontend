import axios from 'axios';
import { ColumnData } from 'src/api/models';

const parseColumn = (column: ColumnData): ColumnData => {
  return {
    id: Number(column.id),
    name: String(column.name),
    limit: Number(column.limit),
  };
};

const addColumn = async (name: string, limit: number): Promise<ColumnData> => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/Columns/', {
      name,
      limit,
    });
    return parseColumn(response.data);
  } catch (e) {
    throw new Error(e);
  }
};

export default addColumn;
