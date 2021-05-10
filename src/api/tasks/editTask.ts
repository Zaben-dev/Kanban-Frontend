import axios from 'axios';
import { difficulty, priority, TaskData } from 'src/api/models';
import { DOMAIN } from 'src/api/serverDomain';

const editTask = async (
  id: number,
  title: string,
  description: string,
  priority: priority,
  difficulty: difficulty
): Promise<TaskData> => {
  try {
    const response = await axios.put(DOMAIN + '/Tasks/' + id + '/', {
      title,
      description,
      priority,
      difficulty,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default editTask;
