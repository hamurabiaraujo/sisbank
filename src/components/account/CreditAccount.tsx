import React from "react";
import AccountService from "../../services/account";
import Account from "../../interfaces/account";

export default class CreditAccount extends React.Component<any, any> {
  
  service = new AccountService();
  accounts: Account[];
  
  constructor(props: any) {
    super(props);
    this.state = {
        accountId: '',
        creditValue: 0
    };

    this.accounts = props.accounts;    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange(event: any) {
    const target = event.target;
    const value = target.type === 'number' ? target.valueAsNumber : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  

  handleSubmit(event: any) {
    event.preventDefault();
    this.accounts = this.service.creditOnAccount(this.state.accountId, this.state.creditValue, this.accounts);
    this.setState({
        accountId: '',
        creditValue: 0
    });

    alert(`R$${this.state.creditValue} creditado na conta ${this.state.accountId}`);
  }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                <label>Número da conta:
                    <input name="accountId" type="text" value={this.state.accountId} onChange={this.handleChange} />
                </label>
                <label>Valor:
                    <input name="creditValue" type="number" value={this.state.creditValue} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Creditar" />
                </form>
            </React.Fragment>
        
        )
    }
}
