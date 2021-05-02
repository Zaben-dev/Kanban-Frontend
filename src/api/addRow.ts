import axios from 'axios';
import { rowData } from 'src/api/models';

const parseRow = (row: any): any => {
  return {
    id: +row.id,
    name: row.name + '',
  };
};

const addRow = async (name: string): Promise<rowData> => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/Rows/', {
      name,
    });
    return parseRow(response.data);
  } catch (e) {
    throw new Error(e);
  }
};

export default addRow;
