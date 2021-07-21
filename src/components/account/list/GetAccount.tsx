import React from "react";
import Account from "../../../interfaces/account";
import AccountService from "../../../services/account";

export default class GetAccount extends React.Component <any, any>{
    accounts: Account[];
    service = new AccountService();

    constructor(props: any) {
        super(props);
        this.state = {
            id: ''
        };

        this.accounts = props.accounts;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            id: event.target.value
        });
    }
  
    handleSubmit(event: any) {
        event.preventDefault();
        const bankBalance = this.service.getBankBalance(this.state.id, this.accounts);
        if(isNaN(bankBalance)) {
            alert('Conta não existe');
        } else {
            alert(`Conta N°: ${this.state.id} Saldo: R$ ${bankBalance}`);
        }
        this.setState({
            id: '',
        });
    }

    render() {
        return( 
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <label>Número da conta:
                        <input type="text" value={this.state.id} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Consulta Saldo"/>
                </form>
            </React.Fragment>
        );
    }
}