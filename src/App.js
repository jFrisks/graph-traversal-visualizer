import React from 'react';
import logo from './logo.svg';
import './App.css';

import GraphView from './components/GraphView/GraphView'

function App() {
  return ( 
    <div style={{padding: 100}}>
      <GraphView height={400} width={600}/>
    </div>
  );
}

export default App;
