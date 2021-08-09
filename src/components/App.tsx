import React from 'react';
import './App.css';
import NewAccount from './account/NewAccount';
import NewBonusAccount from './account/NewBonusAccount';
import NewSavingsAccount from './account/NewSavingsAccount';
import AccountService from '../services/account';
import BonusAccountService from '../services/bonusAccount';
import SavingsAccountService from '../services/savingsAccount';
import Account from '../interfaces/account';
import BonusAccount from '../interfaces/bonusAccount';
import SavingAccount from '../interfaces/savingsAccount';
import AccountList from "./account/list/AccountList";
import BonusAccountList from './account/list/BonusAccountList';
import SavingsAccountList from './account/list/SavingsAccountList';
import SavingsAccount from "./account/Savings";
import GetAccount from "./account/list/GetAccount";
import AccountOperations from './account/AccountOperations';
import Transfer from './account/Transfer';

class App extends React.Component <any, any> {
  
  service = new AccountService();
  bonusService = new BonusAccountService();
  savingsAccountsService = new SavingsAccountService();

  accounts: any[] = [];
  bonusAccounts: BonusAccount[] = [];
  savingsAccounts: SavingAccount[] = [];

  constructor(props: any) {
    super(props);
    this.updateAccounts();
    this.state = {
      accounts: this.accounts,
      bonusAccounts: this.bonusAccounts,
      savingsAccounts: this.savingsAccounts,
    };

    this.handleAccountsChange = this.handleAccountsChange.bind(this);
    this.handleCreditAccount = this.handleCreditAccount.bind(this);
    this.handleTransferDone = this.handleTransferDone.bind(this);
    this.handleBonusAccountsChange = this.handleBonusAccountsChange.bind(this);
    this.handleSavingsAccountsChange = this.handleSavingsAccountsChange.bind(this);
  }

  updateAccounts() {
    this.accounts = this.service.getAll();
    this.bonusAccounts = this.bonusService.getAll();
    this.savingsAccounts = this.savingsAccountsService.getAll();
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

  handleSavingsAccountsChange(account: Account) {
    this.savingsAccountsService.create(account);
    this.updateAccounts();
    this.setState({
      accounts: this.accounts,
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
        <h2>Criar conta Poupança</h2>
        <NewSavingsAccount onAccountsChange={this.handleSavingsAccountsChange}/>
        <h2>Creditar/Debitar na conta</h2>
        <AccountOperations onCreditAccountChange={this.handleCreditAccount} accounts={this.accounts} bonusAccounts={this.bonusAccounts}/>
        <h2>Consultar Saldo</h2>
        <GetAccount accounts={this.accounts} bonusAccounts={this.bonusAccounts} />
        <GetAccount accounts={this.accounts}/>
        <h2>Calcular juros poupança</h2>
        <SavingsAccount accounts={this.savingsAccounts}/>
        <h2>Transferir Saldo</h2>
        <Transfer accounts={this.accounts} bonusAccounts={this.bonusAccounts} onTransferDone={this.handleTransferDone}/>
        <h2>Contas</h2>
        <AccountList accounts={this.accounts}/>
        <h2>Contas Bonus</h2>
        <BonusAccountList accounts={this.bonusAccounts}/>
        <h2>Contas Poupança</h2>
        <SavingsAccountList accounts={this.savingsAccounts}/>
      </div>
    );
  }
}

export default App;
