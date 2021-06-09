import axios from 'axios';
import { rowData } from '../models';
import { DOMAIN } from 'src/api/serverDomain';

const editRow = async (id: number, name: string): Promise<rowData> => {
  try {
    const response = await axios.put(DOMAIN + '/Rows/' + id + '/', {
      name,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default editRow;
