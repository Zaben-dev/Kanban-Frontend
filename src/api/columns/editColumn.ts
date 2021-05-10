import axios from 'axios';
import { ColumnData } from 'src/api/models';
import { DOMAIN } from 'src/api/serverDomain';

const editColumn = async (
  id: number,
  name: string,
  limit: number | null
): Promise<ColumnData> => {
  try {
    const response = await axios.put(DOMAIN + '/Columns/' + id + '/', {
      name,
      limit,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default editColumn;
