const account = require('./account')
const Account = require('./account')

formatDate = (date) => {

  const day = date.getDate()
  let month = date.getMonth() +1
  const year = date.getFullYear()
  if (month < 10){
    month = "0"+month
  }

  const date_ = `${day}/${month}/${year}`;
  return date_;
}

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
  it("Current date is stored when depositing", () => {
    const account = new Account;
    const date = formatDate(new Date)
    const deposit = account.Deposit(1000);

    expect(deposit.amount).toBe(1000)
    expect(deposit.date).toBe(date)
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
  it("Date is stored when withdrawing", () => {
    const account = new Account();
    const date = formatDate(new Date)
    account.Deposit(1000)
    const withdraw = account.Withdraw(500)
    expect(withdraw.amount).toBe(500)
    expect(withdraw.date).toBe(date)
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
    date = formatDate(new Date())
    expect(account.GetTransactions()).toEqual([deposit, withdraw])
    expect(account.GetTransactions()[1].amount).toBe(250)
    expect(account.GetTransactions()[1].balance).toBe(750)
    expect(account.GetTransactions()[1].date).toBe(date)
    expect(account.GetTransactions()[1].type).toBe("WITHDRAW")

  })
  it("Adds deposits and withdrawals to a list of transactions", () => {
    const account = new Account;
    const deposit = account.Deposit(1000)
    const withdraw = account.Withdraw(250)
    date = formatDate(new Date())


    expect(account.GetTransactions()).toEqual([deposit, withdraw])
    expect(account.GetTransactions()[0].amount).toBe(1000)
    expect(account.GetTransactions()[0].date).toBe(date)
    expect(account.GetTransactions()[0].type).toBe("DEPOSIT")
    expect(account.GetTransactions()[0].balance).toBe(1000)
    expect(account.GetTransactions()[1].amount).toBe(250)
    expect(account.GetTransactions()[1].date).toBe(date)
    expect(account.GetTransactions()[1].balance).toBe(750)
    expect(account.GetTransactions()[1].type).toBe("WITHDRAW")

  })
  it("Prints a statement of all transactions to the console", () => {
    const account = new Account;
    account.Deposit(1000)
    account.Withdraw(300)

    const logSpy = jest.spyOn(global.console, 'log');

    account.PrintStatement();
    date = formatDate(new Date())

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("date || credit || debit || balance || type");
    expect(logSpy).toHaveBeenCalledWith(`${date} || || 1000 || 1000 || DEPOSIT`);
    expect(logSpy).toHaveBeenCalledWith(`${date} || 300 || || 700 || WITHDRAW`);

  })
  it("Deposit amount has a maximum of 2 decimal places", () => {
    const account = new Account;
    
    expect(() => {account.Deposit(30.555)}).toThrow(Error)
    expect(() => {account.Deposit(30.555)}).toThrow("Maximum of 2 decimal places")
  })
  it("Withdraw amount has a maximum of 2 decimal places", () => {
    const account = new Account;
    account.Deposit(100)
    expect(() => {account.Withdraw(30.555)}).toThrow(Error)
    expect(() => {account.Withdraw(30.555)}).toThrow("Maximum of 2 decimal places")
  })
})