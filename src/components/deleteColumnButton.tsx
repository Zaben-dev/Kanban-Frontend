import React, { useContext } from 'react';
import columnsContext from 'src/utils/columnsContext';
import currentColumnIdContext from 'src/utils/currentColumnIdContext';
import deleteColumn from 'src/api/deleteColumn';

const DeleteColumnButton = () => {
  const { setColumns } = useContext(columnsContext);
  const { id: currentColumnId } = useContext(currentColumnIdContext);

  const handleClick = () => {
    deleteColumn(currentColumnId).then(() => {
      setColumns((prevColumns) => {
        if (prevColumns === null) return null;
        return prevColumns.filter(({ id }) => id !== currentColumnId);
      });
    });
  };

  return <button onClick={handleClick}>delete</button>;
};

export default DeleteColumnButton;
