import React from 'react';
import './App.css';
import NewAccount from './account/NewAccount';
import NewBonusAccount from './account/NewBonusAccount';
import AccountService from '../services/account';
import BonusAccountService from '../services/bonusAccount';
import Account from '../interfaces/account';
import BonusAccount from '../interfaces/bonusAccount';
import AccountList from "./account/list/AccountList";
import BonusAccountList from './account/list/BonusAccountList';
import GetAccount from "./account/list/GetAccount";
import AccountOperations from './account/AccountOperations';
import Transfer from './account/Transfer';

class App extends React.Component <any, any> {
  
  service = new AccountService();
  bonusService = new BonusAccountService();
  accounts: any[] = [];
  bonusAccounts: BonusAccount[] = [];

  constructor(props: any) {
    super(props);
    this.updateAccounts();
    this.state = {
      accounts: this.accounts,
      bonusAccounts: this.bonusAccounts,
    };

    this.handleAccountsChange = this.handleAccountsChange.bind(this);
    this.handleCreditAccount = this.handleCreditAccount.bind(this);
    this.handleTransferDone = this.handleTransferDone.bind(this);
    this.handleBonusAccountsChange = this.handleBonusAccountsChange.bind(this);
  }

  updateAccounts() {
    this.accounts = this.service.getAll();
    this.bonusAccounts = this.bonusService.getAll();
  }

  handleAccountsChange(account: Account) {
    this.service.create(account);
    this.updateAccounts();
    this.setState({
      accounts: this.accounts,
    });
  }
  
  handleBonusAccountsChange(account: BonusAccount) {
    this.bonusService.create(account);
    this.updateAccounts();
    this.setState({
      bonusAccounts: this.bonusAccounts,
    });
  }

  handleCreditAccount(accountsUpdated: Account[], bonusAccountUpdated: BonusAccount[]) {
    this.setState({
      accounts: accountsUpdated,
      bonusAccounts: bonusAccountUpdated,
    });
  }

  handleTransferDone(accountsUpdated: Account[], bonusAccountUpdated: BonusAccount[]) {
    this.setState({
      accounts: accountsUpdated,
      bonusAccounts: bonusAccountUpdated,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Sistema de Gerenciamento Bancário</h1>
        <h2>Criar conta</h2>
        <NewAccount onAccountsChange={this.handleAccountsChange}/>
        <h2>Criar conta Bonus</h2>
        <NewBonusAccount onAccountsChange={this.handleBonusAccountsChange}/>
        <h2>Creditar/Debitar na conta</h2>
        <AccountOperations onCreditAccountChange={this.handleCreditAccount} accounts={this.accounts} bonusAccounts={this.bonusAccounts}/>
        <h2>Consultar Saldo</h2>
        <GetAccount accounts={this.accounts} bonusAccounts={this.bonusAccounts} />
        <AccountList accounts={this.accounts}/>
        <BonusAccountList accounts={this.bonusAccounts}/>
        <h2>Transferir Saldo</h2>
        <Transfer accounts={this.accounts} bonusAccounts={this.bonusAccounts} onTransferDone={this.handleTransferDone}/>
        <GetAccount accounts={this.accounts}/>
      </div>
    );
  }
}

export default App;
