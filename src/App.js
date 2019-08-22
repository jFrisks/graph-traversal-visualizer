import React from 'react';
import logo from './logo.svg';
import './App.css';

import GraphView from './components/GraphView/GraphView'
import SnackbarLayout from './components/SnackbarLayout'

function App() {
  return ( 
    <SnackbarLayout>
      <GraphView height={window.innerHeight} width={window.innerWidth}/>
    </SnackbarLayout>
  );
}

export default App;
