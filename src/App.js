import React, { Component } from 'react';
import './App.css';
import Authen from './Authen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Firebase Login</h1>
        </header>
        <Authen />
      </div>
    );
  }
}

export default App;
