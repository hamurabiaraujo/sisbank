import React from "react";
import AccountService from "../../services/account";

class SavingsAccount extends React.Component <any, any> {
  service = new AccountService();

  constructor(props: any) {
    super(props);
    this.state = {
      accountId: '',
      amount: 0,
      interestRate: 0,
      totalAmount: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const account = this.service.getById(this.state.accountId, this.props.accounts);

    console.log(account);

    if ( account ) {
      alert(`Total: R$ ${account.value * (this.state.interestRate / 100) + account.value}`);
    } else {
      alert('Conta não encontrada!');
    }
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>Número da conta:
            <input type="text" value={this.state.accountId} onChange={e => this.setState({ accountId: e.target.value })} />
          </label>
          <label>Taxa de juros:
            <input type="text" value={this.state.interestRate} onChange={e => this.setState({ interestRate: parseInt(e.target.value, 10) })} />
          </label>
          <input type="submit" value="Calcular" />
        </form>
      </React.Fragment>
    );
  }
}

export default SavingsAccount;