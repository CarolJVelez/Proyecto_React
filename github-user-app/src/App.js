import './App.css';
import React from 'react';
import GitHubUser from './GitHubUser';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Información Usuarios de GitHub</h1>
        <GitHubUser />
      </header>
    </div>
  );
}

export default App;
