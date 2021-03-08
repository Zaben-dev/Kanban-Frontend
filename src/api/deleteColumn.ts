import axios, { AxiosResponse } from 'axios';

const deleteColumn = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.delete('/column/' + id);
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default deleteColumn;
