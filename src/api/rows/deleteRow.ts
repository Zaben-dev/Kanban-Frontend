import axios, { AxiosResponse } from 'axios';

const deleteRow = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.delete(
      'http://127.0.0.1:8000/Rows/' + id + '/'
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default deleteRow;
