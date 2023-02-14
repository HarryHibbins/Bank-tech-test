const Account = require('./account')
const Display = require('./display')
const Transaction = require('./transaction')
describe("Integration", () => {
  it("Account is updated after a deposit", () => {
    const account = new Account();
    const transaction = new Transaction(1000);

    account.Deposit(transaction);
    
    expect(transaction.getNewBalance()).toBe(1000)
    expect(account.getBalance()).toBe(1000)
  })
  it("Account is updated after a withdrawal", () => {
    const account = new Account();
    const d_transaction = new Transaction(1000);
    const w_transaction = new Transaction(500);

    account.Deposit(d_transaction);
    account.Withdraw(w_transaction);
    expect(d_transaction.getNewBalance()).toBe(1000)
    expect(w_transaction.getNewBalance()).toBe(500)
    expect(account.getBalance()).toBe(500)
  })
  it("Each deposit and transaction are added to a list of transactions", () => {
    const account = new Account();
    const d_transaction = new Transaction(1000);
    const w_transaction = new Transaction(500);

    account.Deposit(d_transaction);
    account.Withdraw(w_transaction);
    expect(d_transaction.getNewBalance()).toBe(1000)
    expect(w_transaction.getNewBalance()).toBe(500)
    expect(account.getBalance()).toBe(500)
    expect(account.getTransactions()).toBe [d_transaction, w_transaction]
    expect(account.getTransactions()[0].getNewBalance()).toBe (1000)
    expect(account.getTransactions()[1].getNewBalance()).toBe (500)
  }),
  it("Prints a statement of all transactions to the console", () => {
    const account = new Account;

    account.Deposit(new Transaction(1000))
    account.Withdraw(new Transaction(250))

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