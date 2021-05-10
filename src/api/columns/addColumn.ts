import axios from 'axios';
import { ColumnData } from 'src/api/models';

const parseColumn = (column: ColumnData): ColumnData => {
  return {
    id: +column.id,
    name: column.name + '',
    limit: column.limit === null ? null : +column.limit,
  };
};

const addColumn = async (
  name: string,
  limit: number | null
): Promise<ColumnData> => {
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
