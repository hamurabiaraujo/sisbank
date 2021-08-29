import AccountService from "./account";
import Account from "../interfaces/account";

test('getAll should return 4 accounts on start', () => {
    const accountClass = new AccountService();
    expect(accountClass.getAll().length).toEqual(4);
});

test('getAll should return 5 accounts after creation of a new account', () => {
    const accountClass = new AccountService();
    const newAccount: Account = {id: getRandomIntInclusive(445, 9999).toString(), value: 0};
    accountClass.create(newAccount);
    window.alert = () => {}; 
    expect(accountClass.getAll().length).toEqual(5);
});

test('credit on account', () => {
    const accountClass = new AccountService();
    const newAccount: Account = {id: getRandomIntInclusive(445, 9999).toString(), value: 0};
    accountClass.create(newAccount);
    window.alert = () => {}; 

    accountClass.operationOnAccount(newAccount.id, 100, 'Credit', accountClass.getAll());

    expect(accountClass.getById(newAccount.id, accountClass.getAll())?.value).toEqual(100);
});

test('debit on account', () => {
    const accountClass = new AccountService();
    const newAccount: Account = {id: getRandomIntInclusive(445, 9999).toString(), value: 200};
    accountClass.create(newAccount);
    window.alert = () => {}; 
    accountClass.operationOnAccount(newAccount.id, 100, 'Debit', accountClass.getAll());

    expect(accountClass.getById(newAccount.id, accountClass.getAll())?.value).toEqual(100);
});

test('non existent account operation should not happen', () => {
    const accountClass = new AccountService();
    const consoleSpy = jest.spyOn(console, 'log');
    accountClass.operationOnAccount('1234', 100, 'Debit', accountClass.getAll());
    

    expect(consoleSpy).toHaveBeenCalledWith('Conta não existe');
});

test('account balance should not have negative balance greater than 1000', () => {
    const accountClass = new AccountService();
    const newAccount: Account = {id: getRandomIntInclusive(445, 9999).toString(), value: -1000};
    accountClass.create(newAccount);
    window.alert = () => {}; 

    accountClass.operationOnAccount(newAccount.id, 100, 'Debit', accountClass.getAll());
    const consoleSpy = jest.spyOn(console, 'log');
    expect(accountClass.getById(newAccount.id, accountClass.getAll())?.value).toEqual(-1000);
    expect(consoleSpy).toHaveBeenCalledWith('Debito não pode ser realizado. Limite máximo de saldo negativo de R$ -1.000,00.');
});


test('transfer between two accounts', () => {
    const accountClass = new AccountService();
    const newAccount1: Account = {id: getRandomIntInclusive(445, 9999).toString(), value: 100};
    const newAccount2: Account = {id: getRandomIntInclusive(445, 9999).toString(), value: 200};
    accountClass.create(newAccount1);
    window.alert = () => {};
    accountClass.create(newAccount2);
    window.alert = () => {};  

    accountClass.transfer(newAccount1.id, newAccount2.id, 75, accountClass.getAll());
    expect(accountClass.getById(newAccount1.id, accountClass.getAll())?.value).toEqual(25);
    expect(accountClass.getById(newAccount2.id, accountClass.getAll())?.value).toEqual(275);
});


export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}