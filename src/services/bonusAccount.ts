import BonusAccount from "../interfaces/bonusAccount";



export default class BonusAccountService {

  ACCOUNTS = [] as BonusAccount[];

  getAll(): BonusAccount[] {
    return this.ACCOUNTS;
  }

  create(a: BonusAccount) {
    a.bonus = 10;
    this.ACCOUNTS.push(a);
    console.log(this.ACCOUNTS);
  }
  
  operationOnAccount(accountId: string, operationValue: number, typeOfOperation: string, accounts: BonusAccount[]): BonusAccount[] {
    const accountIndex = accounts.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      if(typeOfOperation === 'Credit'){
        accounts[accountIndex].value += operationValue;
        const bonusPoints = Math.floor(operationValue/100);
        accounts[accountIndex].bonus += bonusPoints;
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

  getBankBalance(accountId: string, accounts: BonusAccount[]): number {
    const accountIndex = accounts.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      return accounts[accountIndex].value;
    } else {
      console.log('Conta não existe');
      return NaN;
    }
  }

  getBonusPoints(accountId: string, accounts: BonusAccount[]): number {
    const accountIndex = accounts.findIndex(acc => acc.id === accountId);
    if(accountIndex >= 0) {
      return accounts[accountIndex].bonus;
    } else {
      console.log('Conta não existe');
      return NaN;
    }
  }

  transfer(fromAccountId: string, toAccountId: string, value: number, accounts: any[]): any[] {
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
        const bonusPoints = Math.floor(value/150);
        accounts[toAccountIndex].bonus += bonusPoints;
        alert(`Transferência efetuada com sucesso`);
      }
    } else {
      console.log('Conta não existe');
    }
    
    return accounts;
  }
   
}