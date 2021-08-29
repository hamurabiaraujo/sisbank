import BonusAccountService from "./bonusAccount";
import BonusAccount from "../interfaces/bonusAccount";

test('new bonus account should start with 10 bonus points', () => {
    const bonusAccountClass = new BonusAccountService();
    const newBonusAccount: BonusAccount = {id: getRandomIntInclusive(445, 9999).toString(), value: 0, bonus: 0};

    bonusAccountClass.create(newBonusAccount);
    window.alert = () => {};
    expect(bonusAccountClass.getById(newBonusAccount.id, bonusAccountClass.getAll())?.bonus).toEqual(10);
});

test('credit on bonus account', () => {
    const bonusAccountClass = new BonusAccountService();
    const newBonusAccount: BonusAccount = {id: getRandomIntInclusive(445, 9999).toString(), value: 0, bonus: 0};
    bonusAccountClass.create(newBonusAccount);
    window.alert = () => {}; 

    bonusAccountClass.operationOnAccount(newBonusAccount.id, 100, 'Credit', bonusAccountClass.getAll());

    expect(bonusAccountClass.getById(newBonusAccount.id, bonusAccountClass.getAll())?.bonus).toEqual(11);
});

test('transfer between two bonus accounts', () => {
    const bonusAccountClass = new BonusAccountService();
    const newBonusAccount1: BonusAccount = {id: getRandomIntInclusive(445, 9999).toString(), value: 200, bonus: 0};
    const newBonusAccount2: BonusAccount = {id: getRandomIntInclusive(445, 9999).toString(), value: 150, bonus: 0};
    bonusAccountClass.create(newBonusAccount1);
    window.alert = () => {};
    bonusAccountClass.create(newBonusAccount2);
    window.alert = () => {};  

    bonusAccountClass.transfer(newBonusAccount1.id, newBonusAccount2.id, 150, bonusAccountClass.getAll());
    expect(bonusAccountClass.getById(newBonusAccount1.id, bonusAccountClass.getAll())?.bonus).toEqual(10);
    expect(bonusAccountClass.getById(newBonusAccount2.id, bonusAccountClass.getAll())?.bonus).toEqual(11);
});

export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}