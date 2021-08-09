import React from "react";
import Account from "../../interfaces/account";
import SavingsAccountService from "../../services/savingsAccount";

class NewSavingsAccount extends React.Component <any, Account> {
  service = new SavingsAccountService();

  constructor(props: any) {
    super(props);

    this.state = {
      id: '',
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      id: event.target.value,
    });
  }

  handleValueChange(event: any) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.service.create(this.state);
    this.props.onAccountsChange(this.state);
    this.setState({
      id: '',
      value: 0,
    });
    alert(`Nova conta criada: ${this.state.id}. Saldo inicial: ${this.state.value}`);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>Número da conta:
            <input type="text" value={this.state.id} onChange={this.handleChange} placeholder="Número"/>
          </label>
          <label>Saldo:
            <input type="text" value={this.state.value} onChange={this.handleValueChange} placeholder="Saldo inicial"/>
          </label>
          <input type="submit" value="Criar" />
        </form>
      </React.Fragment>
    );
  }
}

export default NewSavingsAccount;