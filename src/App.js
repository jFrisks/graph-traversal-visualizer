import React from 'react';
import logo from './logo.svg';
import './App.css';

import GraphView from './components/GraphView/GraphView'

function App() {
  return ( 
    <div>
      <GraphView height={window.innerHeight} width={window.innerWidth}/>
    </div>
  );
}

export default App;
