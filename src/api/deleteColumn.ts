import axios, { AxiosResponse } from 'axios';
import { DOMAIN } from 'src/api/serverDomain';

const deleteColumn = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.delete(DOMAIN + '/Columns/' + id + '/');
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default deleteColumn;
