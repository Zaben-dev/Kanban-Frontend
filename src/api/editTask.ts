import axios, { AxiosResponse } from 'axios';
import { difficulty, priority } from 'src/api/models';

const editTask = async (
  id: number,
  title: string,
  description: string,
  priority: priority,
  difficulty: difficulty
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/Tasks/' + id + '/',
      { title, description, priority, difficulty }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default editTask;
