import React from 'react';
import './App.css';
import Login from './components/Login';
import Editor from './components/Editor';
import Diagram from './components/Diagram';

function App() {
  return (
    <div className="App">
      <Login />
      <Editor />
      <Diagram />
    </div>
  );
}

export default App;