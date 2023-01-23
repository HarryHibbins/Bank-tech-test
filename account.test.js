const account = require('./account');
const Account = require('./account')

describe(Account, () => {
  it("Has a balance", () => {
    const account = new Account;
    
    expect(account.GetBalance()).toBe(0)
  })
  it("Balance can be increased by depositing", () => {
    const account = new Account;
    
    account.Deposit(1000);
    expect(account.GetBalance()).toBe(1000)
  })
  it("Only a postive number can be deposited", () => {
    const account = new Account;
    
    expect(() => {account.Deposit(-1000)}).toThrow(Error)
    expect(() => {account.Deposit(-1000)}).toThrow("Number must be greater than 0")
    expect(() => {account.Deposit(0)}).toThrow(Error)
    expect(() => {account.Deposit(0)}).toThrow("Number must be greater than 0")
  })
})