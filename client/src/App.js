import React from 'react';
import logo from './logo.svg';
import ToDo from './components/ToDo';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToDo />
      </header>
    </div>
  );
}

export default App;
