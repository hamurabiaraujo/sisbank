import React from "react";
import BonusAccount from "../../interfaces/bonusAccount";
import BonusAccountService from "../../services/bonusAccount";

class NewBonusAccount extends React.Component <any, BonusAccount> {
  service = new BonusAccountService();

  constructor(props: any) {
    super(props);

    this.state = {
      id: '',
      value: 0,
      bonus: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      id: event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.service.create(this.state);
    this.props.onAccountsChange(this.state);
    this.setState({
      id: '',
    });
    alert(`Nova conta bonus criada: ${this.state.id}`);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>Número da conta:
            <input type="text" value={this.state.id} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Criar conta Bonus" />
        </form>
      </React.Fragment>
    );
  }
}

export default NewBonusAccount;