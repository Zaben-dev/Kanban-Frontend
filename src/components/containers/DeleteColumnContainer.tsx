import { useContext, useState } from 'react';
import columnsContext from 'src/utils/columnsContext';
import currentColumnIdContext from 'src/utils/currentColumnIdContext';
import DeleteColumn from 'src/components/presentational/DeleteColumn';
import deleteColumn from 'src/api/deleteColumn';

const DeleteColumnContainer = () => {
  const { setColumns } = useContext(columnsContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading((prev) => !prev);
    deleteColumn(currentColumnId).then(() => {
      setColumns((prev) => {
        if (prev === null) return null;
        return prev.filter(({ id }) => id !== currentColumnId);
      });
      setIsLoading((prev) => !prev);
    });
  };

  return <DeleteColumn handleDelete={handleDelete} isLoading={isLoading} />;
};

export default DeleteColumnContainer;
