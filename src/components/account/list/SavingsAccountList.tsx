import React from "react";
import SavingAccount from "../../../interfaces/savingsAccount";

export default class SavingsAccountList extends React.Component <any, any>{
  
  accounts: SavingAccount[];
  
  constructor(props: any) {
    super(props);
    this.state = {};

    this.accounts = props.accounts;
  }

  render() {
    const items = this.accounts.map( a => <li key={a.id}>{a.id} : R$ {a.value}</li> );
    return( <ul>{items}</ul> );
  }
}