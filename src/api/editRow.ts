import axios from 'axios';
import { rowData } from './models';

const editRow = async (id: number, name: string): Promise<rowData> => {
  try {
    const response = await axios.put('http://127.0.0.1:8000/Rows/' + id + '/', {
      name,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default editRow;
