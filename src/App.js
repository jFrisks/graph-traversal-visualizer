import React from 'react';
import logo from './logo.svg';
import './App.css';

import GraphView from './components/GraphView/GraphView'

function App() {
  return ( 
    <div>
      <GraphView height={800} width={1480}/>
    </div>
  );
}

export default App;
