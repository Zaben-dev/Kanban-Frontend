import axios, { AxiosResponse } from 'axios';
import { DOMAIN } from 'src/api/serverDomain';

const deleteRow = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.delete(DOMAIN + '/Rows/' + id + '/');
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default deleteRow;
