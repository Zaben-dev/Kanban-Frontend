import { useContext } from 'react';
import { rowData } from 'src/api/models';
import boardDataContext from 'src/contexts/boardDataContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import Row from 'src/components/presentational/Row';
import ScrollableArea from 'src/components/presentational/ScrollableArea';

const RowsContainer = () => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { boardData } = useContext(boardDataContext);

  const getColumnRows = (): rowData[] => {
    const index = boardData.findIndex(
      (column) => column.id === currentColumnId
    );
    return boardData[index].rows;
  };

  return (
    <>
      <ScrollableArea>
        {getColumnRows().map((row, index) => (
          <Row key={index} index={index} id={row.id} name={row.name} />
        ))}
      </ScrollableArea>
    </>
  );
};

export default RowsContainer;
