import axios from 'axios';
import { rowData } from 'src/api/models';
import { DOMAIN } from 'src/api/serverDomain';

const parseRow = (row: rowData): rowData => {
  return {
    id: +row.id,
    name: row.name + '',
    tasks: [],
  };
};

const addRow = async (name: string): Promise<rowData> => {
  try {
    const response = await axios.post(DOMAIN + '/Rows/', {
      name,
    });
    return parseRow(response.data);
  } catch (e) {
    throw new Error(e);
  }
};

export default addRow;
