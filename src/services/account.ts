import Account from "../interfaces/account";



export default class AccountService {

  ACCOUNTS = [
    {
      id: '111',
      value: 10.00
    },
    {
      id: '222',
      value: 20.00
    },
    {
      id: '333',
      value: 25.00
    },
    {
      id: '444',
      value: 100.00
    },
  ] as Account[];

  getAll(): Account[] {
    return this.ACCOUNTS;
  }


  create(a: Account) {
    this.ACCOUNTS.push(a);
  }
}