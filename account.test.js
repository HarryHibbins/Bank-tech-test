const Account = require('./account')

describe(Account, () => {
  it("Has a balance", () => {
    const account = new Account;
    
    expect(account.GetBalance()).toBe(0)
  })
  it("Balance can be increased by depositing", () => {
    const account = new Account;
    
    const deposit = account.Deposit(1000);
    expect(deposit.amount).toBe(1000)
    expect(deposit.balance).toBe(1000)
    expect(account.GetBalance()).toBe(1000)
  })
  it("Only a number greater than 0 can be deposited", () => {
    const account = new Account;
    
    expect(() => {account.Deposit(-1000)}).toThrow(Error)
    expect(() => {account.Deposit(-1000)}).toThrow("Number must be greater than 0")
    expect(() => {account.Deposit(0)}).toThrow(Error)
    expect(() => {account.Deposit(0)}).toThrow("Number must be greater than 0")

    expect(account.GetBalance()).toBe(0)
  })
  it("Balance can be decreased by withdrawing", () => {
    const account = new Account();
    
    account.Deposit(1000)
    const withdraw = account.Withdraw(500)
    expect(withdraw.amount).toBe(500)
    expect(withdraw.balance).toBe(500)
    expect(account.GetBalance()).toBe(500)
  })
  it("Only a number greater than 0 can be withdrawn", () => {
    const account = new Account;
    
    expect(() => {account.Withdraw(-1000)}).toThrow(Error)
    expect(() => {account.Withdraw(-1000)}).toThrow("Number must be greater than 0")
    expect(() => {account.Withdraw(0)}).toThrow(Error)
    expect(() => {account.Withdraw(0)}).toThrow("Number must be greater than 0")

    expect(account.GetBalance()).toBe(0)
  })
  it("Amount must be greater than balance to be withdrawn", () => {
    const account = new Account;
    
    expect(() => {account.Withdraw(500)}).toThrow(Error)
    expect(() => {account.Withdraw(500)}).toThrow("Insufficient funds")
    
    expect(account.GetBalance()).toBe(0)
  })
  it("Adds deposits to a list of transactions", () => {
    const account = new Account;
    const deposit = account.Deposit(1000)
    expect(account.GetTransactions()).toEqual([deposit])
    expect(account.GetTransactions()[0].amount).toBe(1000)
    expect(account.GetTransactions()[0].type).toBe("DEPOSIT")

  })
  it("Adds withdrawals to a list of transactions", () => {
    const account = new Account;
    const deposit = account.Deposit(1000)
    const withdraw = account.Withdraw(250)
    expect(account.GetTransactions()).toEqual([deposit, withdraw])
    expect(account.GetTransactions()[1].amount).toBe(250)
    expect(account.GetTransactions()[1].balance).toBe(750)
    expect(account.GetTransactions()[1].type).toBe("WITHDRAW")

  })
  it("Adds deposits and withdrawals to a list of transactions", () => {
    const account = new Account;
    const deposit = account.Deposit(1000)
    const withdraw = account.Withdraw(250)
    expect(account.GetTransactions()).toEqual([deposit, withdraw])
    expect(account.GetTransactions()[0].amount).toBe(1000)
    expect(account.GetTransactions()[0].type).toBe("DEPOSIT")
    expect(account.GetTransactions()[0].balance).toBe(1000)
    expect(account.GetTransactions()[1].amount).toBe(250)
    expect(account.GetTransactions()[1].balance).toBe(750)
    expect(account.GetTransactions()[1].type).toBe("WITHDRAW")

  })
})