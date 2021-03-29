import axios from 'axios';
import { TaskData } from 'src/api/models';

const moveTask = async (
  id: number,
  title: string,
  description: string,
  columnId: number,
  position: number
): Promise<TaskData> => {
  try {
    const response = await axios.put(
      'http://127.0.0.1:8000/Tasks/' + id + '/',
      { title, description, columnId, position }
    );
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default moveTask;
