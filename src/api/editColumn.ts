import axios, { AxiosResponse } from 'axios';

const editColumn = async (
  id: number,
  name: string,
  limit: number
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/api/Columns/' + id + '/',
      { name, limit }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default editColumn;
