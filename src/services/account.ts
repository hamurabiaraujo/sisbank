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
    console.log(this.ACCOUNTS);
  }
  
  creditOnAccount(accountId: string, creditValue: number, accounts: Account[]): Account[] {
    this.ACCOUNTS = accounts;
    const accountIndex = accounts.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      accounts[accountIndex].value += creditValue;
    } else {
      console.log('Conta não existe');
    }
    return accounts;
  }

  transfer(fromAccountId: string, toAccountId: string, value: number, accounts: Account[]): Account[] {
    this.ACCOUNTS = accounts;

    const fromAccountIndex = accounts.findIndex(acc => acc.id === fromAccountId);
    const toAccountIndex = accounts.findIndex(acc => acc.id === toAccountId);

    console.log(fromAccountIndex, toAccountIndex);

    if(fromAccountIndex >= 0 && toAccountIndex >= 0) {
      accounts[fromAccountIndex].value -= value;
      accounts[toAccountIndex].value += value;
    } else {
      console.log('Conta não existe');
    }
    
    return accounts;
  }
   
}