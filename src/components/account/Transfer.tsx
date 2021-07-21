import React from 'react';
import Account from '../../interfaces/account';
import AccountService from '../../services/account';

export default class Transfer extends React.Component <any, any> {
  service = new AccountService();
  accounts: Account[] = [];

  constructor(props: any) {
    super(props);

    this.state = {
      fromAccountId: '',
      toAccountId: '',
      amount: '',
    }

    this.accounts = props.accounts;  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.accounts = this.service.transfer(this.state.fromAccountId, this.state.toAccountId, this.state.amount, this.accounts);
    this.props.onTransferDone(this.accounts);

    this.setState({
      fromAccountId: '',
      toAccountId: '',
      amount: 0,
    });

    alert(`Transferência efetuada com sucesso`);
  }

  handleChange(event: any) {
    const target = event.target;
    const value = target.type === 'number' ? target.valueAsNumber : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>Número da conta:
            <input name="fromAccountId" type="text" value={this.state.fromAccountId} onChange={this.handleChange} placeholder="Origem"/>
            <input name="toAccountId" type="text" value={this.state.toAccountId} onChange={this.handleChange} placeholder="Destino"/>
            <input name="amount" type="number" value={this.state.amount} onChange={this.handleChange} placeholder="Valor"/>
          </label>
          <input type="submit" value="Tranferir" />
        </form>
      </React.Fragment>
    );
  }
}
