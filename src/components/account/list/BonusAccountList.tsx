import React from "react";
import BonusAccount from "../../../interfaces/bonusAccount";

export default class BonusAccountList extends React.Component <any, any>{
  
  bonusAccounts: BonusAccount[];
  
  constructor(props: any) {
    super(props);
    this.state = {};

    this.bonusAccounts = props.accounts;
  }

  render() {
    const items = this.bonusAccounts.map( a => <li key={a.id}>{a.id} : R$ {a.value} Pontos {a.bonus}</li> );
    return( <ul>{items}</ul> );
  }
}