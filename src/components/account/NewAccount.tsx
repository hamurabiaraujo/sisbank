import React from "react";
import Account from "../../interfaces/account";
import AccountService from "../../services/account";
import AccountList from "./list/AccountList";
import CreditAccount from "./CreditAccount";

class NewAccount extends React.Component <any, Account> {

  service = new AccountService();
  accounts: Account[] = [];

  constructor(props: any) {
    super(props);

    this.state = {
      id: '',
      value: 0
    };

    this.updateAccounts(); 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateAccounts() {
    this.accounts = this.service.getAll();
  }

  handleChange(event: any) {
    this.setState({
      id: event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.service.create(this.state);
    this.setState({
      id: '',
    });
    this.updateAccounts();

    alert(`Nova conta criada: ${this.state.id}`);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>Número da conta:
            <input type="text" value={this.state.id} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Criar" />
        </form>
        <AccountList accounts={this.accounts}/>
        <CreditAccount />
      </React.Fragment>
    );
  }
}

export default NewAccount;