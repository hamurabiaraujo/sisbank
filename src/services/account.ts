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

  /*getById(idAccount: string): Account {
    const account = this.ACCOUNTS.find(acc => { return acc.id = idAccount});
    if(account){
      return account;
    }
  }*/ 


  create(a: Account) {
    this.ACCOUNTS.push(a);
  }
  
  creditOnAccount(accountId: string, creditValue: number) {
    const accountIndex = this.ACCOUNTS.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      this.ACCOUNTS[accountIndex].value += creditValue;
    }
    else {
      console.log('Conta não existe');
    }
  }
   
}