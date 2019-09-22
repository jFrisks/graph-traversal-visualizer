import React from 'react';
import styled from 'styled-components'
import logo from './logo.svg';
import './App.css';

import GraphView from './components/GraphView/GraphView'
import SnackbarLayout from './components/SnackbarLayout'
import { Button } from '@material-ui/core';

function App() {
  return ( 
    <SnackbarLayout>
      <GraphView height={window.innerHeight} width={window.innerWidth}/>
    </SnackbarLayout>
    
  );
}

export default App;
