import axios, { AxiosResponse } from 'axios';

const deleteTask = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.delete(
      'http://127.0.0.1:8000/Tasks/' + id + '/'
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default deleteTask;
