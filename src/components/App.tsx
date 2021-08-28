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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
      <Router>
        <div className="App">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/nova-conta">Criar Conta</Link></li>
            <li><Link to="/nova-conta-bonus">Criar Conta Bônus</Link></li>
            <li><Link to="/nova-conta-poupanca">Criar Conta Poupança</Link></li>
            <li><Link to="/creditar-e-debitar">Creditar / Debitar</Link></li>
            <li><Link to="/consultar-saldo">Consultar Saldo</Link></li>
            <li><Link to="/calcular-juros">Calcular Juros Poupança</Link></li>
            <li><Link to="/transferir">Transferir</Link></li>
            <li><Link to="/listar-contas">Ver Contas </Link></li>
            <li><Link to="/listar-contas-bonus">Ver Contas Bônus</Link></li>
            <li><Link to="/listar-contas-poupanca">Ver Contas Poupança</Link></li>
          </ul>
          <Switch>
            <Route exact path="/">
              <h1>Sistema de Gerenciamento Bancário</h1>
            </Route>
            <Route exact path="/nova-conta">
              <NewAccount onAccountsChange={this.handleAccountsChange}/>
            </Route>
            <Route exact path="/nova-conta-bonus">
              <NewBonusAccount onAccountsChange={this.handleBonusAccountsChange}/>
            </Route>
            <Route exact path="/nova-conta-poupanca">
              <NewSavingsAccount onAccountsChange={this.handleSavingsAccountsChange}/>
            </Route>
            <Route exact path="/creditar-e-debitar">
              <AccountOperations onCreditAccountChange={this.handleCreditAccount} accounts={this.accounts} bonusAccounts={this.bonusAccounts}/>
            </Route>
            <Route exact path="/consultar-saldo">
              <GetAccount accounts={this.accounts} bonusAccounts={this.bonusAccounts} />
              <GetAccount accounts={this.accounts}/>
            </Route>
            <Route exact path="/calcular-juros">
              <SavingsAccount accounts={this.savingsAccounts}/>
            </Route>
            <Route exact path="/transferir">
              <Transfer accounts={this.accounts} bonusAccounts={this.bonusAccounts} onTransferDone={this.handleTransferDone}/>
            </Route>
            <Route exact path="/listar-contas">
              <AccountList accounts={this.accounts}/>
            </Route>
            <Route exact path="/listar-contas-bonus">
              <BonusAccountList accounts={this.bonusAccounts}/>
            </Route>
            <Route exact path="/listar-contas-poupanca">
              <SavingsAccountList accounts={this.savingsAccounts}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
