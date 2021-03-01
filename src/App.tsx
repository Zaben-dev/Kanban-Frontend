import React, { useState, useEffect } from 'react';
import { Column } from 'src/api/models';
import getColumns from 'src/api/getColumns';
import server from 'src/api/mockServer';

server();

function App() {
  const [columns, setColumns] = useState<Column[] | null>([]);

  useEffect(() => {
    getColumns().then((columns: Column[] | null) => {
      setColumns(columns);
    });
  }, []);

  return <div>a</div>;
}

export default App;
