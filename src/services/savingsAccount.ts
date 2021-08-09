import SavingAccount from '../interfaces/savingsAccount';

export default class SavingsAccountService {

  ACCOUNTS = [] as SavingAccount[];

  getAll(): SavingAccount[] {
    return this.ACCOUNTS;
  }

  create(a: SavingAccount) {
    console.log(this.ACCOUNTS);
    this.ACCOUNTS.push(a);
  }
}