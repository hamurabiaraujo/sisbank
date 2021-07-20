import React from "react";
import Account from "../../../interfaces/account";
import CreditAccount from '../CreditAccount';

export default class AccountList extends React.Component <any, any>{
  
  accounts: Account[];
  
  constructor(props: any) {
    super(props);
    this.state = {};

    this.accounts = props.accounts;
  }

  render() {
    const items = this.accounts.map( a => <li key={a.id}>{a.id} : R$ {a.value}</li> );
    return( <div>
              <ul>{items}</ul>
              <CreditAccount accounts={this.accounts}/>
            </div> );
  }
}