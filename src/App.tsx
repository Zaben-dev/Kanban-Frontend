import React, { useState, useEffect } from 'react';
import { Column } from './api/models';
import logo from './logo.svg';
import getColumns from './api/getColumns';
import './App.css';
import server from './api/mockServer';

server();

function App() {
  const [columns, setColumns] = useState<Column[] | null>([]);

  useEffect(() => {
    getColumns().then((columns: Column[] | null) => {
      setColumns(columns);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
