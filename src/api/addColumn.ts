import axios, { AxiosResponse } from 'axios';

const addColumn = async (
  name: string,
  limit: number
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/Columns/', {
      name,
      limit,
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default addColumn;
