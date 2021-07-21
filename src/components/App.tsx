import React from 'react';
import './App.css';
import NewAccount from './account/NewAccount';
import AccountService from '../services/account';
import Account from '../interfaces/account';
import AccountList from "./account/list/AccountList";
import GetAccount from "./account/list/GetAccount";
import AccountOperations from './account/AccountOperations';
import Transfer from './account/Transfer';

class App extends React.Component <any, any> {
  
  service = new AccountService();
  accounts: Account[] = [];

  constructor(props: any) {
    super(props);
    this.updateAccounts();
    this.state = {
      accounts: this.accounts,
    };

    this.handleAccountsChange = this.handleAccountsChange.bind(this);
    this.handleCreditAccount = this.handleCreditAccount.bind(this);
    this.handleTransferDone = this.handleTransferDone.bind(this);
  }

  updateAccounts() {
    this.accounts = this.service.getAll();
  }

  handleAccountsChange(account: Account) {
    this.service.create(account);
    this.updateAccounts();
    this.setState({
      accounts: this.accounts,
    });
  }

  handleCreditAccount(accountsUpdated: Account[]) {
    this.setState({
      accounts: accountsUpdated,
    });
  }

  handleTransferDone(accountsUpdated: Account[]) {
    this.setState({
      accounts: accountsUpdated,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Sistema de Gerenciamento Bancário</h1>
        <h2>Criar conta</h2>
        <NewAccount onAccountsChange={this.handleAccountsChange}/>
        <h2>Creditar/Debitar na conta</h2>
        <AccountOperations onCreditAccountChange={this.handleCreditAccount} accounts={this.accounts}/>
        <h2>Consultar Saldo</h2>
        <GetAccount accounts={this.accounts}/>
        <h2>Transferir Saldo</h2>
        <Transfer accounts={this.accounts} onTransferDone={this.handleTransferDone}/>
        <AccountList accounts={this.accounts}/>
      </div>
    );
  }
}

export default App;
