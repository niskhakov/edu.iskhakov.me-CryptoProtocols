import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Magma from './pages/Magma';
import Kuznechik from './pages/Kuznechik';

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/magma" component={Magma} />
        <Route exact path="/kuznechik" component={Kuznechik} />
      </Container>
    </Router>
  );
}

export default App;
