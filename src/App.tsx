import React, { useState, useEffect } from 'react';
import { Column } from './api/models';
import getColumns from './api/getColumns';
import server from './api/mockServer';

server();

function App() {
  const [columns, setColumns] = useState<Column[] | null>([]);

  useEffect(() => {
    getColumns().then((columns: Column[] | null) => {
      setColumns(columns);
    });
  }, []);

  return <div></div>;
}

export default App;
