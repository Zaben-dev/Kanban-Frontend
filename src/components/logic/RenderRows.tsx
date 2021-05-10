import { useContext } from 'react';
import boardDataContext from 'src/contexts/boardDataContext';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import Row from 'src/components/presentational/Row';
import ScrollableArea from 'src/components/presentational/ScrollableArea';
import findColumnIndex from 'src/utils/dataFinders/findColumnIndex';

const RenderRows = () => {
  const { id: currentColumnId } = useContext(currentColumnIdContext);
  const { boardData } = useContext(boardDataContext);
  const columnIndex = findColumnIndex(currentColumnId, boardData);
  const rows = boardData[columnIndex].rows;

  return (
    <>
      <ScrollableArea>
        {rows.map((row, index) => (
          <Row key={index} index={index} id={row.id} name={row.name} />
        ))}
      </ScrollableArea>
    </>
  );
};

export default RenderRows;
