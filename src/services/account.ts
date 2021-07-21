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
  
  operationOnAccount(accountId: string, operationValue: number, typeOfOperation: string, accounts: Account[]): Account[] {
    const accountIndex = accounts.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      if(typeOfOperation === 'Credit'){
        accounts[accountIndex].value += operationValue;
      } else if (typeOfOperation === 'Debit') {
        accounts[accountIndex].value -= operationValue;
      } else {
        console.log('Operação inválida');
      }
    } else {
      console.log('Conta não existe');
    }
    return accounts;
  }

  getBankBalance(accountId: string, accounts: Account[]): number {
    const accountIndex = accounts.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      return accounts[accountIndex].value;
    } else {
      console.log('Conta não existe');
      return NaN;
    }
  }
   
}