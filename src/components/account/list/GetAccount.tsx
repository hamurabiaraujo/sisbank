import React from "react";
import Account from "../../../interfaces/account";
import BonusAccount from "../../../interfaces/bonusAccount";
import AccountService from "../../../services/account";
import BonusAccountService from "../../../services/bonusAccount";

export default class GetAccount extends React.Component <any, any>{
    accounts: Account[];
    bonusAccounts: BonusAccount[];
    service = new AccountService();
    bonusService = new BonusAccountService();

    constructor(props: any) {
        super(props);
        this.state = {
            id: ''
        };

        this.accounts = props.accounts;
        this.bonusAccounts = props.bonusAccounts;
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
        const allAccounts: any[] = this.accounts.concat(this.bonusAccounts);
        const bankBalance = this.bonusService.getBankBalance(this.state.id, allAccounts);
        const bonusPoints = this.bonusService.getBonusPoints(this.state.id, allAccounts);
        if(isNaN(bankBalance)) {
            alert('Conta não existe');
        } else if(isNaN(bonusPoints)) {
            alert(`Conta N°: ${this.state.id} Saldo: R$ ${bankBalance}`);
        } else {
            alert(`Conta N°: ${this.state.id} Saldo: R$ ${bankBalance} Pontos: ${bonusPoints}`);
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
                    <input type="submit" value={ this.bonusAccounts ? "Consulta Saldo Bonus" : "Consulta Saldo" }/>
                </form>
            </React.Fragment>
        );
    }
}