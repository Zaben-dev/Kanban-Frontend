import axios from 'axios';
import { TaskData } from 'src/api/models';
import { DOMAIN } from 'src/api/serverDomain';

const moveTask = async (
  id: number,
  title: string,
  description: string,
  rowId: number,
  columnId: number,
  position: number
): Promise<TaskData> => {
  try {
    const response = await axios.put(DOMAIN + '/Tasks/' + id + '/', {
      title,
      description,
      rowId,
      columnId,
      position,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default moveTask;