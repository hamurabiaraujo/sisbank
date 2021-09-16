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
    {
      id: '555',
      value: 160.00
    },
  ] as Account[];

  getAll(): Account[] {
    return this.ACCOUNTS;
  }

  getById(id: string, accounts: Account[]) {
    return accounts.find(acc => acc.id === id);
  }

  create(a: Account) {
    this.ACCOUNTS.push(a);
    console.log(this.ACCOUNTS);
  }
  
  operationOnAccount(accountId: string, operationValue: number, typeOfOperation: string, accounts: Account[]): Account[] {
    const accountIndex = accounts.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      if(typeOfOperation === 'Credit'){
        accounts[accountIndex].value += operationValue;
        alert(`R$${operationValue} creditado na conta ${accountId}`);
      } else if (typeOfOperation === 'Debit') {
        if((accounts[accountIndex].value - operationValue) < -1000){
          alert('Debito não pode ser realizado. Limite máximo de saldo negativo de R$ -1.000,00.');
          console.log('Debito não pode ser realizado. Limite máximo de saldo negativo de R$ -1.000,00.');
        } else {
          accounts[accountIndex].value -= operationValue;
          alert(`R$${operationValue} debitado na conta ${accountId}`);
        }
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

  transfer(fromAccountId: string, toAccountId: string, value: number, accounts: Account[]): Account[] {
    this.ACCOUNTS = accounts;

    const fromAccountIndex = accounts.findIndex(acc => acc.id === fromAccountId);
    const toAccountIndex = accounts.findIndex(acc => acc.id === toAccountId);

    console.log(fromAccountIndex, toAccountIndex);

    if(fromAccountIndex >= 0 && toAccountIndex >= 0) {
      if((accounts[fromAccountIndex].value - value) < -1000){
        alert('Transferencia não pode ser realizada. Limite máximo de saldo negativo de R$ -1.000,00.');
        console.log('Transferencia não pode ser realizada. Limite máximo de saldo negativo de R$ -1.000,00.');
      } else {
        accounts[fromAccountIndex].value -= value;
        accounts[toAccountIndex].value += value;
        alert(`Transferência efetuada com sucesso`);
      }
    } else {
      console.log('Conta não existe');
    }
    
    return accounts;
  }
   
}