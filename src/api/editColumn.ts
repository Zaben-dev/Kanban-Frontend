import axios from 'axios';
import { ColumnData } from './models';

const editColumn = async (
  id: number,
  name: string,
  limit: number | null
): Promise<ColumnData> => {
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/Columns/' + id + '/',
      { name, limit }
    );
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default editColumn;
