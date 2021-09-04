import SavingsAccountService from "./savingsAccount";

test('should get all items', () => {
    const service = new SavingsAccountService();
    const accounts = [
        { id: '111',value: 10.00 },
        { id: '222',value: 20.00 },
        { id: '333',value: 25.00 },
        { id: '444',value: 100.00 },
    ];

    accounts.map( account => {
        service.create( account );
    });

    expect(service.getAll()).toEqual(accounts);
});

test('show create an Savings Account', () => {
    const service = new SavingsAccountService();
    const account = {
        id: "123456",
        value: 100
    };

    service.create( account );
    service.getAll().map( item => {
        expect(item).toEqual(account);
    });
});