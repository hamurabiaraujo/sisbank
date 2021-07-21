import React from "react";
import AccountService from "../../services/account";
import Account from "../../interfaces/account";

export default class AccountOperations extends React.Component<any, any> {
  
  service = new AccountService();
  accounts: Account[];
  
  constructor(props: any) {
    super(props);
    this.state = {
        accountId: '',
        operationValue: 0,
        selectedOption: 'Credit'
    };

    this.accounts = props.accounts;    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTypeOfOperationChange = this.onTypeOfOperationChange.bind(this);
  }

  
  handleChange(event: any) {
    const target = event.target;
    const value = target.type === 'number' ? target.valueAsNumber : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  onTypeOfOperationChange(event: any) {
    this.setState({
      selectedOption: event.target.value
    });
  }
  

  handleSubmit(event: any) {
    event.preventDefault();
    this.accounts = this.service.operationOnAccount(this.state.accountId, this.state.operationValue, this.state.selectedOption, this.accounts);
    this.props.onCreditAccountChange(this.accounts);
    this.setState({
        accountId: '',
        operationValue: 0
    });
    if(this.state.selectedOption === 'Credit'){
      alert(`R$${this.state.operationValue} creditado na conta ${this.state.accountId}`);
    } else if(this.state.selectedOption === 'Debit'){
      alert(`R$${this.state.operationValue} debitado na conta ${this.state.accountId}`);
    } 
  }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                <label>Número da conta:
                    <input name="accountId" type="text" value={this.state.accountId} onChange={this.handleChange} />
                </label>
                <label>Valor:
                    <input name="operationValue" type="number" value={this.state.operationValue} onChange={this.handleChange} />
                </label>
                <input type="radio" name="typeOfOperation" value="Credit" checked={this.state.selectedOption === "Credit"} onChange={this.onTypeOfOperationChange}/>Crédito
                <input type="radio" name="typeOfOperation" value="Debit" checked={this.state.selectedOption === "Debit"} onChange={this.onTypeOfOperationChange}/>Débito
                <input type="submit" value="Executar" />
                </form>
            </React.Fragment>
        
        )
    }
}