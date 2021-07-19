import React from 'react';
import './App.css';
import NewAccount from './account/NewAccount';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <h1>Sistema de Gerenciamento Bancário</h1>
        <NewAccount />
      </div>
    );
  }
}

export default App;
