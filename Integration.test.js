const Account = require('./account')
const Deposit = require('./deposit')
const Withdraw = require('./withdraw')
const Display = require('./display')
describe("Integration", () => {
  it("Account is updated after a deposit", () => {
    const account = new Account();
    const deposit = new Deposit(1000);

    account.Deposit(deposit);
    
    expect(deposit.GetNewBalance()).toBe(1000)
    expect(account.GetBalance()).toBe(1000)
  })
  it("Account is updated after a withdrawal", () => {
    const account = new Account();
    const deposit = new Deposit(1000);
    const withdraw = new Withdraw(500);

    account.Deposit(deposit);
    account.Withdraw(withdraw);
    expect(deposit.GetNewBalance()).toBe(1000)
    expect(withdraw.GetNewBalance()).toBe(500)
    expect(account.GetBalance()).toBe(500)
  })
  it("Each deposit and transaction are added to a list of transactions", () => {
    const account = new Account();
    const deposit = new Deposit(1000);
    const withdraw = new Withdraw(500);

    account.Deposit(deposit);
    account.Withdraw(withdraw);
    expect(deposit.GetNewBalance()).toBe(1000)
    expect(withdraw.GetNewBalance()).toBe(500)
    expect(account.GetBalance()).toBe(500)
    expect(account.GetTransactions()).toBe [deposit, withdraw]
    expect(account.GetTransactions()[0].GetNewBalance()).toBe (1000)
    expect(account.GetTransactions()[1].GetNewBalance()).toBe (500)
  }),
  it("Prints a statement of all transactions to the console", () => {
    const account = new Account;

    account.Deposit(new Deposit(1000))
    account.Withdraw(new Withdraw(250))

    const logSpy = jest.spyOn(global.console, 'log');


    const display = new Display(account);
    display.printStatement(); 
    const date = (new Date()).toLocaleDateString()

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("date || credit || debit || balance");
    expect(logSpy).toHaveBeenCalledWith(`${date} || || 1000.00 || 1000.00`);
    expect(logSpy).toHaveBeenCalledWith(`${date} || 250.00 || || 750.00`);

  })
})