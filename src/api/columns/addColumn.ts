import axios from 'axios';
import { ColumnData } from 'src/api/models';
import { DOMAIN } from 'src/api/serverDomain';

const parseColumn = (column: ColumnData): ColumnData => {
  return {
    id: +column.id,
    name: column.name + '',
    limit: column.limit === null ? null : +column.limit,
  };
};

const addColumn = async (
  name: string,
  limit: number | null
): Promise<ColumnData> => {
  try {
    const response = await axios.post(DOMAIN + '/Columns/', {
      name,
      limit,
    });
    return parseColumn(response.data);
  } catch (e) {
    throw new Error(e);
  }
};

export default addColumn;